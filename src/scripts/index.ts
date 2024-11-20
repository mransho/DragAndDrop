import { Fields } from "./components/Fields.js";
import { Popup } from "./components/Popup.js";
import { projectsList } from "./components/ProjectsList.js";
new Fields();

new projectsList("Intial");
new projectsList("Active");
new projectsList("Finished");

new Popup();