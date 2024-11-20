import { ProjectRules } from "../store/ProjectRules";
import { Base } from "./Base.js";

export class Project extends Base<HTMLDListElement> {
  private _project: ProjectRules;
  constructor(projectsListId: string, project: ProjectRules) {
    super("project-item", projectsListId, project.id, false);
    this._project = project;
    this._renderProject()
  }
  private _renderProject(): void {
    const title = this.element.querySelector(".project_title")! as HTMLHeadElement;
    const desc = this.element.querySelector(".project_desc")! as HTMLParagraphElement;
    title.textContent = this._project.title;
    desc.textContent = this._project.desc;
  }
}
