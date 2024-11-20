import { projectState } from "../store/ProjectState.js";
import { assignValidateInputs, handleValidationErrors, } from "../utils/validation/validation_helpers.js";
import { Base } from "./Base.js";
export class Fields extends Base {
    constructor() {
        super("fields", "app", "form", true);
        this._addProject();
    }
    _addProject() {
        this.element.addEventListener("submit", this._handleAddProject.bind(this));
    }
    _handleAddProject(e) {
        e.preventDefault();
        const [titleInput, descInput] = this._targetInputs();
        const [titleValue, descValue] = this._getInputValues(titleInput, descInput);
        if (this._validateInputsValues(titleValue, descValue)) {
            projectState.createProject(titleValue, descValue);
            this._clearInputsValues(titleInput, descInput);
        }
    }
    _targetInputs() {
        const titleInput = document.getElementById("title");
        const descInput = document.getElementById("desc");
        return [titleInput, descInput];
    }
    _getInputValues(titleInput, descInput) {
        const titleValue = titleInput.value;
        const descValue = descInput.value;
        return [titleValue, descValue];
    }
    _validateInputsValues(titleValue, descValue) {
        const [titleInputRule, descInputRule] = assignValidateInputs(titleValue, descValue);
        const titleErrorMsg = handleValidationErrors(titleInputRule);
        const descErrorMsg = handleValidationErrors(descInputRule);
        const popupContainer = document.getElementById("popup_container");
        const descPopup = document.querySelector(".desc_popup");
        if (titleErrorMsg.length) {
            popupContainer.classList.add("visible_popup");
            descPopup.textContent = titleErrorMsg;
            return false;
        }
        else if (descErrorMsg.length) {
            popupContainer.classList.add("visible_popup");
            descPopup.textContent = descErrorMsg;
            return false;
        }
        return true;
    }
    _clearInputsValues(titleInput, descInput) {
        titleInput.value = "";
        descInput.value = "";
    }
}
//# sourceMappingURL=Fields.js.map