import * as THREE from "three";
import ENGINE from "./instance";
import * as OBC from "@thatopen/components"
import * as FRAGS from "@thatopen/fragments"
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

export class GeneralEditor {
  // We'll start by creating 2 events that will be useful for UI updates
  readonly onUpdated = new OBC.Event<void>();
  readonly sampleMaterialsUpdated = new OBC.Event<void>();

  // We'll need a reference to the currently used world
  private _world: OBC.World;

  // This is the current element that we are editing
  private _element: FRAGS.Element | null = null;

  // This is the current three.js mesh that we will use to make edits to the selected element
  private _mesh: THREE.Group | null = null;

  // These are the global and local transform controls that we will use to edit the selected element
  private _gControls: TransformControls;
  private _lControls: TransformControls[] = [];

  // This is the transform that we will be editing: global or local
  private _controlType: "global" | "local" = "global";

  // Here we will store a list of materials, local transformsIds and geometries ids
  // We will use it to allow the user to change the material, local transform or geometry of a sample
  // The reason why we store the whole material and not only the ID is to display its color in the select menu
  private _materials: Map<number, FRAGS.RawMaterial> | null = null;
  private _localTransformsIds: number[] = [];
  private _geometriesIds: number[] = [];

  // We need to get the materials, local transforms and geometries asynchronously, so we can't get them
  // in the constructor. We need to wait for the model to be initialized first. So we will define getters
  // that will throw an error if the model is not initialized yet.

  get materials() {
    if (!this._materials) {
      throw new Error("Editor not initialized");
    }
    return this._materials;
  }

  get localTransformsIds() {
    if (!this._localTransformsIds.length) {
      throw new Error("Editor not initialized");
    }
    return this._localTransformsIds;
  }

  get geometriesIds() {
    if (!this._geometriesIds.length) {
      throw new Error("Editor not initialized");
    }
    return this._geometriesIds;
  }

  // We will also define a getter to expose the samples of the selected element,
  // which will be used for the UI to edit them.

  get samples() {
    if (!this._element) {
      throw new Error("No element selected");
    }
    return this._element.core.samples;
  }

  // We will also define a getter to check if an element is currently selected

  get elementSelected() {
    return this._element !== null;
  }

  // In the constructor we'll simply set up the basic elements and events

  constructor(world: OBC.World) {
    this._world = world;
    this._gControls = new TransformControls(
      world.camera.three,
      world.renderer!.three.domElement!,
    );
    this.setupEvents();
  }

  // We will also define a method to initialize the editor.
  // This will be used to fetch all data necessary to build the UI.
  // We don't do this in the constructor because it's async.

  async init() {
    if(!ENGINE?.model) return
    this._materials = await ENGINE?.model?.getMaterials();
    const allLtIds = await ENGINE?.model?.getLocalTransformsIds();
    const allGeomsIds = await ENGINE?.model?.getRepresentationsIds();
    this._localTransformsIds = [allLtIds[0], allLtIds[1]];
    this._geometriesIds = [allGeomsIds[0], allGeomsIds[1]];
  }

  // This method will return the list of Threejs materials
  // used by the currently selected element.

  get3dMaterials() {
    if (!this._mesh) {
      return [];
    }
    const materialList = new Map<string, THREE.MeshLambertMaterial>();

    this._mesh.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        materialList.set(
          object.material.userData.localId,
          object.material as THREE.MeshLambertMaterial,
        );
      }
    });

    return Array.from(materialList.values());
  }

  // Now we'll define a method that allows to change the material of a sample

  async setSampleMaterial(id: number, material: number) {
    if (!this._element) {
      return;
    }
    this._element.core.samples[id].material = material;
    await this.updateSamples();
    this.sampleMaterialsUpdated.trigger();
  }

  // Now we'll define a method that will update the materials list.
  // This is needed to update the UI material color when a material was edited

  async updateMaterials() {
    if (!this._materials || !ENGINE?.model) return
    this._materials = await ENGINE?.model?.getMaterials();
  }

  // This method illustrates how to override the geometry of a sample
  // This is useful for building editors that rely on our geometry engine
  // (e.g. to build something similar to Revit Wall System Family)

  overrideGeometryWithCube() {
    if (!this._mesh) {
      return;
    }
    this._mesh.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const geometry = object.geometry as THREE.BufferGeometry;
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        geometry.setAttribute("position", boxGeometry.attributes.position);
        geometry.setIndex(boxGeometry.index);
        geometry.setAttribute("normal", boxGeometry.attributes.normal);
      }
    });
  }

  // This method will apply the changes to the selected element
  // Then it will unselect it

  async applyChanges() {
    if (!this._element || !this._mesh) {
      return;
    }

    // This generates the requests to apply the changes to the selected mesh
    await this._element.setMeshes(this._mesh);

    // This unselects the element and disposes everything related to it
    this.dispose();

    // This applies the generated changes to Fragments
    const requests = this._element.getRequests();
    if (requests && !!ENGINE?.model) {
      await ENGINE?.fragments?.core?.editor.edit(ENGINE?.model?.modelId, requests);
    }

    // If no changes were made, we show the hidden items
    if (!this._element.elementChanged) {
      // No changes: show hidden items
      await this.setVisible(true);
    }

    // This updates the viewer to see the changes
    await ENGINE?.fragments?.core?.update(true);

    // This resets the element and mesh variables
    this._element = null;
    this._mesh = null;

    // This triggers the UI update
    this.onUpdated.trigger();
  }

  // This method will set the mode of the global and local transform controls
  // Fragments only support translate and rotate

  setControlsMode(mode: "translate" | "rotate") {
    this._gControls.setMode(mode);
    for (const localTransformControl of this._lControls) {
      localTransformControl.setMode(mode);
    }
  }

  // This method allows to change between local and global transform controls

  setControlsTarget(target = this._controlType) {
    const globalGizmo = this._gControls.getHelper();
    if (target === "global") {
      this._world.scene.three.add(globalGizmo);
      this._gControls.enabled = true;
      for (const localTransformControl of this._lControls) {
        const localGizmo = localTransformControl.getHelper();
        localGizmo.removeFromParent();
        localTransformControl.enabled = false;
      }
    } else {
      globalGizmo.removeFromParent();
      this._gControls.enabled = false;
      for (const localTransformControl of this._lControls) {
        const localGizmo = localTransformControl.getHelper();
        this._world.scene.three.add(localGizmo);
        localTransformControl.enabled = true;
      }
    }
    this._controlType = target;
  }

  // This method will update the samples of the selected element
  // as well as regenerate the current mesh while maintaining
  // the transform controls
  async updateSamples() {
    if (!this._element || !this._mesh) {
      return;
    }
    const prevTransform = this._mesh.matrixWorld.clone();
    await this._element.updateSamples();
    this.dispose();

    this._mesh = await this._element.getMeshes();
    this._world.scene.three.add(this._mesh);
    await this.createControls();
    this._mesh.position.set(0, 0, 0);
    this._mesh.rotation.set(0, 0, 0);
    this._mesh.applyMatrix4(prevTransform);
  }

  // Here we'll create the Three.js TransformControls
  // for global and local transforms

  private async createControls() {
    if (!this._mesh) {
      return;
    }

    this._gControls.attach(this._mesh);

    for (const localMesh of this._mesh.children) {
      const localTransformControl = new TransformControls(
        ENGINE.world.camera.three,
        ENGINE.world.renderer!.three.domElement!,
      );
      localTransformControl.attach(localMesh);
      localTransformControl.setMode(this._gControls.mode);
      this._lControls.push(localTransformControl);
      localTransformControl.addEventListener("dragging-changed", (event) => {
        if (ENGINE.world.camera.hasCameraControls()) {
          ENGINE.world.camera.controls.enabled = !event.value;
        }
      });
    }

    this.setControlsTarget();
  }

  // This unselects the current element and disposes the transform controls

  private dispose() {
    // Dispose meshes

    if (this._mesh && this._element) {
      this._element.disposeMeshes(this._mesh);
    }
    // Dispose global transform controls
    const globalGizmo = this._gControls.getHelper();
    globalGizmo.removeFromParent();
    this._gControls.detach();
    if (!this._mesh || !this._element) {
      return;
    }
    for (const localTransformControl of this._lControls) {
      localTransformControl.detach();
      localTransformControl.dispose();
    }
    this._lControls.length = 0;
  }

  // This is used to control the visibility of the existing / edited objects
  // When we use the edit API, fragments creates a new Fragments Model called
  // delta model that contains only the changed objects. This is done to avoid
  // having to recompute the whole model when only a few objects were changed.
  // We then hide the edited objects in the original model.
  // This method manages the visibility both in the original model and in the delta model
  // making sure the same element is not visible in both models at the same time.

  private async setVisible(visible: boolean) {
    if (!this._element) {
      return;
    }
    const promises: Promise<void>[] = [];
    for (const [, model] of ENGINE?.fragments?.core?.models.list) {
      if (model?.deltaModelId) {
        if (visible === true) {
          const editedElements = new Set(await model.getEditedElements());
          if (visible && editedElements.has(this._element.localId)) {
            continue;
          }
        }
      }

      promises.push(model.setVisible([this._element.localId], visible));
    }
    await Promise.all(promises);
  }

  // Here we'll setup the events for the global transform controls
  // as well as the double click and keydown events
  private setupEvents() {
    // Prevent camera move when using the global transform controls
    this._gControls.addEventListener("dragging-changed", (event) => {
      if (this._world.camera.hasCameraControls()) {
        this._world.camera.controls.enabled = !event.value;
      }
    });

    // Double click event logic to select an element
    const mouse = new THREE.Vector2();
    const canvas = this._world.renderer!.three.domElement!;
    canvas.addEventListener("dblclick", async (event) => {
        if(!ENGINE.model) return
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        let result: any;

        // Raycast all models, including delta models
        for (const [, model] of ENGINE?.fragments?.core?.models.list) {
            const promises: Promise<FRAGS.RaycastResult | null>[] = [];
            promises.push(
            model.raycast({
                camera: ENGINE.world.camera.three,
                mouse,
                dom: ENGINE.world.renderer!.three.domElement!,
            }),
            );
            const results = await Promise.all(promises);
            let smallestDistance = Infinity;
            for (const current of results) {
            if (current) {
                if (current.distance < smallestDistance) {
                smallestDistance = current.distance;
                result = current;
                }
            }
            }
        }

        // If nothing is found, return
        if (!result) {
            return;
        }

        // If an element was already selected, reset the visibility
        if (this._element) {
            await this.setVisible(true);
        }

        // Get the selected element
        const [element] = await ENGINE.fragments.core.editor.getElements(ENGINE.model.modelId, [
            result.localId,
        ]);

        this._element = element;
        if (!element) {
            return;
        }

        // Dispose the previous mesh, if any
        if (this._mesh) {
            this.dispose();
        }

        // Set the visibility of the selected elements to false in the original model
        await this.setVisible(false);

        // Add the selected meshes to the scene and add the transform controls
        this._mesh = await element.getMeshes();
        this._world.scene.three.add(this._mesh);
        await this.createControls();

        // Update the viewer to see the changes
        await ENGINE.fragments.core.update(true);

        // Trigger the UI update
        this.onUpdated.trigger();
        });

    // Keydown event logic to cancel the edit when pressing the escape key

    window.addEventListener("keydown", async (event) => {
      if (event.key === "Escape") {
        if (!this._element || !this._mesh) {
          return;
        }

        // Clear the existing edit requests
        this._element.getRequests();
        this.dispose();

        // All canceled: show hidden items
        this.setVisible(true);

        // Update the viewer to see the changes
        await ENGINE.fragments.core.update(true);

        // Reset the element and mesh variables
        this._element = null;
        this._mesh = null;

        // Trigger the UI update
        this.onUpdated.trigger();
      }
    });
  }
}