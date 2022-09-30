export default class UpdateDescription extends HTMLElement {
  static get is() {
    return 'update-description';
  }
  connectedCallback() {
    let descriptionElement = document.head.querySelector('meta[name="description"]');
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', this.textContent + '');
    this.remove();
  }
}
customElements.define(UpdateDescription.is, UpdateDescription);
