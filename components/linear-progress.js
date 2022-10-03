export default class LinearProgress extends HTMLElement {
  static get is() {
    return 'linear-progress';
  }
  connectedCallback() {
    this.innerHTML = /* html */ `
      <div class="linear-progress__bar linear-progress__primary-bar">
        <span class="linear-progress__bar-inner"></span>
      </div>
      <div class="linear-progress__bar linear-progress__secondary-bar">
        <span class="linear-progress__bar-inner"></span>
      </div>
    `;
  }
}
customElements.define(LinearProgress.is, LinearProgress);
