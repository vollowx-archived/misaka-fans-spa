// Invisible text
export default class InvText extends HTMLElement {
  static get is() {
    return 'inv-text';
  }
  connectedCallback() {
    if (!this.title) this.title = '你知道的太多了';
  }
}
customElements.define(InvText.is, InvText);
