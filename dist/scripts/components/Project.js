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
        this._runDragging();
    }
    _renderProject() {
        const title = this.element.querySelector(".project_title");
        const desc = this.element.querySelector(".project_desc");
        title.textContent = this._project.title;
        desc.textContent = this._project.desc;
    }
    _deleteProject() {
        const deletButton = this.element.querySelector(".delete");
        deletButton.addEventListener("click", this._handleDeleteProject);
    }
    _handleDeleteProject() {
        if (confirm("Are you sure you want to delete?")) {
            projectState.deleteProject(this._project.id);
        }
        return;
    }
    _runDragging() {
        this.element.addEventListener("dragstart", this._handlDragStart);
        this.element.addEventListener("dragend", this._handlDragEnd);
        this.element.addEventListener("dragover", this._handleDragOver);
        this.element.addEventListener("drop", this._handleDrop);
    }
    _handleDragOver(e) {
        e.preventDefault();
        const target = e.currentTarget;
        const boundingRect = target.getBoundingClientRect();
        const offset = e.clientY - boundingRect.top;
        if (offset < boundingRect.height / 2) {
        }
        else {
        }
    }
    _handleDrop(e) {
        e.preventDefault();
        const target = e.currentTarget;
        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(draggedId);
        const boundingRect = target.getBoundingClientRect();
        const offset = e.clientY - boundingRect.top;
        if (offset < boundingRect.height / 2) {
            target.parentElement.insertBefore(draggedElement, target);
        }
        else {
            target.parentElement.insertBefore(draggedElement, target.nextSibling);
        }
        this._updateProjectOrder(draggedId, target.id);
    }
    _updateProjectOrder(draggedId, targetId) {
        projectState.reorderProjects(draggedId, targetId);
    }
    _handlDragStart(e) {
        this.element.style.opacity = ".1";
        e.dataTransfer.setData("text/plain", this._project.id);
        e.dataTransfer.effectAllowed = "move";
    }
    _handlDragEnd() {
        console.log("drag end");
        this.element.style.opacity = "1";
    }
}
__decorate([
    autoBind
], Project.prototype, "_handleDeleteProject", null);
__decorate([
    autoBind
], Project.prototype, "_handleDragOver", null);
__decorate([
    autoBind
], Project.prototype, "_handleDrop", null);
__decorate([
    autoBind
], Project.prototype, "_handlDragStart", null);
__decorate([
    autoBind
], Project.prototype, "_handlDragEnd", null);
import { autoBind } from "../decreators/autoBind.js";
//# sourceMappingURL=Project.js.map