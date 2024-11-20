var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";
export class Project extends Base {
    constructor(projectsListId, project) {
        super("project-item", projectsListId, project.id, false);
        this._project = project;
        this._renderProject();
        this._deleteProject();
    }
    _renderProject() {
        const title = this.element.querySelector(".project_title");
        const desc = this.element.querySelector(".project_desc");
        title.textContent = this._project.title;
        desc.textContent = this._project.desc;
    }
    _deleteProject() {
        const deletButton = this.element.querySelector(".delete");
        deletButton.addEventListener("click", this._deleteHandler);
    }
    _deleteHandler() {
        if (confirm("Are you sure you want to delete?")) {
            projectState.deleteProject(this._project.id);
        }
    }
}
__decorate([
    autoBind
], Project.prototype, "_deleteHandler", null);
//# sourceMappingURL=Project.js.map