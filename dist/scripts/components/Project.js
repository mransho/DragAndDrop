import { Base } from "./Base.js";
export class Project extends Base {
    constructor(projectsListId, project) {
        super("project-item", projectsListId, project.id, false);
        this._project = project;
        this._renderProject();
    }
    _renderProject() {
        const title = this.element.querySelector(".project_title");
        const desc = this.element.querySelector(".project_desc");
        title.textContent = this._project.title;
        desc.textContent = this._project.desc;
    }
}
//# sourceMappingURL=Project.js.map