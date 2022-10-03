export default class LinksCard extends HTMLElement {
  static get is() {
    return 'links-card';
  }
  connectedCallback() {
    // Because typography system uses class for styles, I can not use shadow root.
    // this.attachShadow({ mode: 'open' });
    this.innerHTML = /* html */ `
      <a href="${this.getAttribute('href')}" target="_blank">
        <p class="title-large">${this.getAttribute('title')}</p>
        <p class="body-large">${this.getAttribute('desc')}</p>
      </a>
    `;
  }
}
customElements.define(LinksCard.is, LinksCard);
