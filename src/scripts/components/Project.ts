import { ProjectRules } from "../store/ProjectRules.js";
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";

export class Project extends Base<HTMLDListElement> {
  private _project: ProjectRules;
  constructor(projectsListId: string, project: ProjectRules) {
    super("project-item", projectsListId, project.id, false);
    this._project = project;
    this._renderProject();
    this._deleteProject();
  }
  private _renderProject(): void {
    const title = this.element.querySelector(
      ".project_title"
    )! as HTMLHeadElement;
    const desc = this.element.querySelector(
      ".project_desc"
    )! as HTMLParagraphElement;
    title.textContent = this._project.title;
    desc.textContent = this._project.desc;
  }

  private _deleteProject(): void {
    const deletButton = this.element.querySelector(
      ".delete"
    )! as HTMLButtonElement;
    deletButton.addEventListener("click", this._deleteHandler.bind(this));
  }
  @autoBind 
  private _deleteHandler(): void {
    if (confirm("Are you sure you want to delete?")) {
      projectState.deleteProject(this._project.id);
    }
  }
  
}
