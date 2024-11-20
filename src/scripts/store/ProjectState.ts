import { projectStatus } from "../utils/project-status.js";
import { ListnerType } from "./ListnerType.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
  private static _instance: ProjectState;
  private _listners: ListnerType[] = [];
  private _projects: ProjectRules[] = [];
  private _localStorageProjects: ProjectRules[] = localStorage.getItem(
    "projects"
  )
    ? JSON.parse(localStorage.getItem("projects")!)
    : [];
  constructor() {
    this._projects = this._localStorageProjects;
  }
  // create singleton instance
  public static getInstance() {
    if (!this._instance) {
      this._instance = new ProjectState();
      return new ProjectState();
    }
    return this._instance;
  }
  public createProject(title: string, desc: string) {
    const newProject = new ProjectRules(
      Math.random().toString(),
      title,
      desc,
      projectStatus.Intial
    );
    this._projects.push(newProject);
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  public deleteProject(projectId: string): void {
    const projectsAfterDelet = this._projects.filter(
      (project: ProjectRules) => {
        return project.id !== projectId;
      }
    );
    this._projects = projectsAfterDelet;
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  private _runListners(): void {
    for (const listner of this._listners) {
      listner([...this._projects]);
    }
  }
  public pushListner(Listner: ListnerType) {
    this._listners.push(Listner);
  }
}
export const projectState = ProjectState.getInstance();
