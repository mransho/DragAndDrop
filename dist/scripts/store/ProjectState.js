import { projectStatus } from "../utils/project-status.js";
import { ProjectRules } from "./ProjectRules.js";
class ProjectState {
    constructor() {
        this._listners = [];
        this._projects = [];
        this._localStorageProjects = localStorage.getItem("projects")
            ? JSON.parse(localStorage.getItem("projects"))
            : [];
        this._projects = this._localStorageProjects;
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new ProjectState();
            return new ProjectState();
        }
        return this._instance;
    }
    createProject(title, desc) {
        const newProject = new ProjectRules(Math.random().toString(), title, desc, projectStatus.Inital);
        this._projects.push(newProject);
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }
    deleteProject(projectId) {
        const projectsAfterDelet = this._projects.filter((project) => {
            return project.id !== projectId;
        });
        this._projects = projectsAfterDelet;
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }
    changeProjectStatus(projectId, newStatus) {
        const project = this._projects.find((p) => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this._runListners();
            localStorage.setItem("projects", JSON.stringify(this._projects));
            console.log("test");
        }
    }
    _runListners() {
        for (const listner of this._listners) {
            listner([...this._projects]);
        }
    }
    pushListner(Listner) {
        this._listners.push(Listner);
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=ProjectState.js.map