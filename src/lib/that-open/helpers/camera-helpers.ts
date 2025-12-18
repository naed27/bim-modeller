import ENGINE from "../instance"
import { INITIAL_CAMERA_POSITION } from "../constants";
import { POSITION, TARGET } from "./controller-helpers";

export const resetCamera = async () => {

    await ENGINE.world.camera.controls.setLookAt(
        INITIAL_CAMERA_POSITION?.positionX,
        INITIAL_CAMERA_POSITION?.positionY,
        INITIAL_CAMERA_POSITION?.positionZ,
        INITIAL_CAMERA_POSITION?.targetX,
        INITIAL_CAMERA_POSITION?.targetY,
        INITIAL_CAMERA_POSITION?.targetZ,
    );

    const controls = ENGINE.world.camera.controls
    
    controls.getPosition(POSITION)
    controls.getTarget(TARGET)

}