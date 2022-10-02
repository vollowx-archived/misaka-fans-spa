// Contributor card
export default class ConCard extends HTMLElement {
  static get is() {
    return 'con-card';
  }
  connectedCallback() {
    this.innerHTML = /* html */ `
      <div class="headline">
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/${this.getAttribute(
            'gh-name'
          )}?s=200&amp;v=4" alt="${this.getAttribute('name')}">
        </div>
        <div class="info">
          <p class="name title-large">${this.getAttribute('name')}</p>
          <a class="icon-button standard" href="https://github.com/${this.getAttribute('gh-name')}" title="TA 的 GitHub 主页：https://github.com/${this.getAttribute('gh-name')}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>
          </a>
          <a class="icon-button standard" href="mailto:${this.getAttribute('email')}" title="TA 的邮箱：${this.getAttribute('email')}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24v2.65q0 2.8-1.975 4.725Q40.05 33.3 37.2 33.3q-1.8 0-3.4-.875-1.6-.875-2.45-2.475-1.3 1.7-3.25 2.525T24 33.3q-3.9 0-6.625-2.7T14.65 24q0-3.9 2.725-6.65Q20.1 14.6 24 14.6t6.625 2.75Q33.35 20.1 33.35 24v2.65q0 1.55 1.125 2.6T37.2 30.3q1.55 0 2.675-1.05Q41 28.2 41 26.65V24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.1 0-12.05 4.95Q7 16.9 7 24q0 7.1 4.95 12.05Q16.9 41 24 41h10.7v3Zm0-13.7q2.65 0 4.5-1.825T30.35 24q0-2.7-1.85-4.55-1.85-1.85-4.5-1.85t-4.5 1.85Q17.65 21.3 17.65 24q0 2.65 1.85 4.475Q21.35 30.3 24 30.3Z"/></svg>
          </a>
        </div>
      </div>
      <div class="content body-large">${this.getAttribute('content')}</div>
    `;
  }
}
customElements.define(ConCard.is, ConCard);
