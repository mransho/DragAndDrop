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
        const newProject = new ProjectRules(Math.random().toString(), title, desc, projectStatus.Intial);
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