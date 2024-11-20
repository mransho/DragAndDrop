import { projectState } from "../store/ProjectState.js";
import {
  assignValidateInputs,
  handleValidationErrors,
} from "../utils/validation/validation_helpers.js";
import { Base } from "./Base.js";

export class Fields extends Base<HTMLFormElement> {
  constructor() {
    super("fields", "app", "form", true);
    this._addProject();
  }

  private _addProject(): void {
    this.element.addEventListener("submit", this._handleAddProject.bind(this));
  }

  private _handleAddProject(e: Event): void {
    e.preventDefault();
    const [titleInput, descInput] = this._targetInputs();
    const [titleValue, descValue] = this._getInputValues(titleInput, descInput);
    if (this._validateInputsValues(titleValue, descValue)) {
      projectState.createProject(titleValue, descValue);
      this._clearInputsValues(titleInput, descInput);
    }
  }

  private _targetInputs(): HTMLInputElement[] {
    const titleInput = document.getElementById("title")! as HTMLInputElement;
    const descInput = document.getElementById("desc")! as HTMLInputElement;
    return [titleInput, descInput];
  }

  private _getInputValues(
    titleInput: HTMLInputElement,
    descInput: HTMLInputElement
  ): string[] {
    const titleValue = titleInput.value;
    const descValue = descInput.value;
    return [titleValue, descValue];
  }

  private _validateInputsValues(titleValue: string, descValue: string) {
    const [titleInputRule, descInputRule] = assignValidateInputs(
      titleValue,
      descValue
    );
    const titleErrorMsg = handleValidationErrors(titleInputRule);
    const descErrorMsg = handleValidationErrors(descInputRule);

    const popupContainer = document.getElementById(
      "popup_container"
    )! as HTMLDivElement;
    const descPopup = document.querySelector(
      ".desc_popup"
    )! as HTMLParagraphElement;

    if (titleErrorMsg.length) {
      popupContainer.classList.add("visible_popup");
      descPopup.textContent = titleErrorMsg;
      return false;
    } else if (descErrorMsg.length) {
      popupContainer.classList.add("visible_popup");
      descPopup.textContent = descErrorMsg;
      return false;
    }
    return true;
  }
  private _clearInputsValues(
    titleInput: HTMLInputElement,
    descInput: HTMLInputElement
  ): void {
    titleInput.value = "";
    descInput.value = "";
  }
}
