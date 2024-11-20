import { projectState } from "../store/ProjectState.js";
import { projectStatus } from "../utils/project-status.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";
export class projectsList extends Base {
    constructor(_status) {
        super("project-list", "app", `${_status}-projects`, false);
        this._status = _status;
        this.renderProjectList();
        if (JSON.parse(localStorage.getItem("projects"))) {
            const localStorageProjects = JSON.parse(localStorage.getItem("projects"));
            this._showProjectInDom(localStorageProjects);
        }
        projectState.pushListner((projects) => {
            this._showProjectInDom(projects);
        });
    }
    _showProjectInDom(projects) {
        const filterProjects = this._filterProjectsStatus(projects);
        this._renderProjects(filterProjects);
    }
    renderProjectList() {
        const title = this.element.querySelector(".title");
        const list = this.element.querySelector("ul");
        list.id = `${this._status}-list`;
        title.textContent = `${this._status} Projects`;
    }
    _renderProjects(projects) {
        const projectsList = document.getElementById(`${this._status}-list`);
        projectsList.innerHTML = "";
        for (const project of projects) {
            new Project(`${this._status}-list`, project);
        }
    }
    _filterProjectsStatus(projects) {
        const filterProjects = projects.filter((project) => {
            if (this._status === "Intial") {
                return project.status === projectStatus.Intial;
            }
            else if (this._status === "Active") {
                return project.status === projectStatus.Active;
            }
            else if (this._status === "Finished") {
                return project.status === projectStatus.Finished;
            }
        });
        return filterProjects;
    }
}
//# sourceMappingURL=ProjectsList.js.map