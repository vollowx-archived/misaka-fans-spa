export default class UpdateTitle extends HTMLElement {
  static get is() {
    return 'update-title';
  }
  connectedCallback() {
    document.title = this.textContent + ' | misaka-fans';
    this.remove();
  }
}
customElements.define(UpdateTitle.is, UpdateTitle);
