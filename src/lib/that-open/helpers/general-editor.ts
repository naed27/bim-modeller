import ENGINE from "../instance";
import { GeneralEditor } from "../general-editor";

export async function setupEditor() {
    const editor = new GeneralEditor(ENGINE.world);
    await editor.init();
    ENGINE.generalEditor = editor
}
