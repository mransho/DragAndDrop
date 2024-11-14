export class Base<T extends HTMLElement> {
  private _template!: HTMLTemplateElement;
  private _hostElement!: HTMLDivElement;
  public element: T;
  constructor(
    private _templateId: string,
    private _hostId: string,
    private _elementId: string,
    private _postionElementStatr: boolean
  ) {
    const [template, _] = this._targetElements(this._templateId, this._hostId);

    const templateContent = document.importNode(template.content, true);

    this.element = templateContent.firstElementChild! as T;
    if (this._elementId) {
      this.element.id = this._elementId;
      this._insertElement(this._postionElementStatr);
    }
  }

  private _targetElements(
    templateId: string,
    hostId: string
  ): [HTMLTemplateElement, HTMLDivElement] {
    this._template = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    this._hostElement = document.getElementById(hostId)! as HTMLDivElement;

    return [this._template, this._hostElement];
  }

  private _insertElement(postionStart: boolean) {
    const isInsertStart = postionStart ? "afterbegin" : "beforeend";
    this._hostElement.insertAdjacentElement(isInsertStart, this.element);
  }
}
