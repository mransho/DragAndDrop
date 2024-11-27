import { autoBind } from "../decreators/autoBind.js";
import { ProjectRules } from "../store/ProjectRules.js";
import { projectState } from "../store/ProjectState.js";
import { projectStatus } from "../utils/project-status.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";

export class projectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Inital" | "Active" | "Finished") {
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
    this._runDragging();
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
      if (this._status === "Inital") {
        return project.status === projectStatus.Inital;
      } else if (this._status === "Active") {
        return project.status === projectStatus.Active;
      } else if (this._status === "Finished") {
        return project.status === projectStatus.Finished;
      }
    });
    return filterProjects;
  }

  private _runDragging(): void {
    this.element.addEventListener("dragover", this._handleDragOver);
    this.element.addEventListener("dragleave", this._handleDragLeave);
    this.element.addEventListener("drop", this._handleProp);
  }
  @autoBind
  private _handleDragOver(e: DragEvent): void {
    const list = this.element.querySelector(
      ".projects-list"
    )! as HTMLDivElement;
    e.preventDefault();
  }

  @autoBind
  private _handleDragLeave(): void {
    const list = this.element.querySelector(
      ".projects-list"
    )! as HTMLDivElement;
  }

  @autoBind
  private _handleProp(e: DragEvent): void {
    if (!e.dataTransfer) return;

    const projectId = e.dataTransfer.getData("text/plain");

    const newStatus =
      this.element.id === "Inital-projects"
        ? projectStatus.Inital
        : this.element.id === "Active-projects"
        ? projectStatus.Active
        : this.element.id === "Finished-projects"
        ? projectStatus.Finished
        : null;

    if (!newStatus) {
      console.error("Invalid project status.");
      return;
    }

    projectState.changeProjectStatus(projectId, newStatus);
  }
}
