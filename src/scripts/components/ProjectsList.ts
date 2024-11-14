import { Base } from "./Base.js";

export class projectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Intial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectList();
  }

  private renderProjectList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector("ul")! as HTMLUListElement;
    list.classList.add(`${this._status}-list`);
    title.textContent = `${this._status} Projects`;
  }
}
