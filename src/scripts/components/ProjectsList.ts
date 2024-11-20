import { ProjectRules } from "../store/ProjectRules.js";
import { projectState } from "../store/ProjectState.js";
import { projectStatus } from "../utils/project-status.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";

export class projectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Intial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectList();

    if (JSON.parse(localStorage.getItem("projects")!)) {
      const localStorageProjects = JSON.parse(
        localStorage.getItem("projects")!
      );
      this._showProjectInDom(localStorageProjects);
    }

    projectState.pushListner((projects: ProjectRules[]) => {
      this._showProjectInDom(projects);
    });
  }

  private _showProjectInDom(projects: ProjectRules[]) {
    const filterProjects = this._filterProjectsStatus(projects);
    this._renderProjects(filterProjects);
  }

  private renderProjectList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector("ul")! as HTMLUListElement;
    list.id = `${this._status}-list`;
    title.textContent = `${this._status} Projects`;
  }

  private _renderProjects(projects: ProjectRules[]): void {
    const projectsList = document.getElementById(
      `${this._status}-list`
    ) as HTMLDivElement;
    projectsList.innerHTML = "";
    for (const project of projects) {
      // const content = this._createProjectElement(project);
      // projectsList.innerHTML += content;
      new Project(`${this._status}-list`, project);
    }
  }

  // private _createProjectElement(project: ProjectRules) {
  //   const content = `
  //     <div> ${project.desc}-projects </div>
  //   `;
  //   return content;
  // }

  private _filterProjectsStatus(projects: ProjectRules[]) {
    const filterProjects = projects.filter((project: ProjectRules) => {
      if (this._status === "Intial") {
        return project.status === projectStatus.Intial;
      } else if (this._status === "Active") {
        return project.status === projectStatus.Active;
      } else if (this._status === "Finished") {
        return project.status === projectStatus.Finished;
      }
    });
    return filterProjects;
  }
}
