import { Base } from "./Base.js";
export class Popup extends Base<HTMLDivElement> {
  constructor() {
    super("popup_template", "app", "popup_container", false);
    this._closePopup();
  }
  private _closePopup() {
    const closeButton = this.element.querySelector(
      ".close"
    )! as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      this.element.classList.remove("visible_popup");
    });
  }
}
