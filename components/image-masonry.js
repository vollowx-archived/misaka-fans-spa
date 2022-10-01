const imageDatas = {
  'misaka-mikoto': {
    prefix: 'https://img.misaka-mikoto.jp/pic/',
    list: [
      ['misaka-battle-group.webp', '御坂战术小组'],
      ['fight-bot.webp', '驱动铠'],
      ['revolution.webp', '革命的时刻！'],
      ['railgun.webp', 'biu---'],
      ['with-misaki2.webp', 'Misaka Misaka'],
      ['with-misaki.webp', 'Misaka Misaka'],
      ['misaka-default.webp', '美琴经典原皮'],
      ['fly.webp', 'Flying Misaka'],
      ['night-kuroko.webp', '晚上的黑子，变得更变态了呢'],
      ['kuroko.webp', 'kuroko1'],
      ['meet-kamijo.webp', '不是上琴桥！'],
      ['with-friends.webp', '似曾相识的图片？'],
      ['cafe.webp', '在咖啡店'],
      ['eat-cake.webp', '美琴吃蛋糕'],
      ['daihaseisai2.webp', '派大星祭'],
      ['daihaseisai3.webp', '派大星祭'],
      ['sister10031.webp', 'Last to die…'],
      ['tsundere2.webp', 'tesundere'],
      ['daihaseisai.webp', '惩罚游戏？！'],
      ['kawaii-no-misaka.webp', 'awa'],
      ['railgun-t.webp', 'Railgun-T!'],
      ['shining-eyes.webp', ':D'],
      ['younger-misaka.webp', 'sis…ter?'],
      ['noon-smile.webp', 'Smile'],
      ['night-smile.webp', 'Smile'],
      ['care.webp', 'Who are you caring about?'],
      ['chest.webp', 'hentai kuroko'],
      ['sister9982.webp', 'Remember her!'],
      ['tsundere.webp', 'tsundere'],
      ['worring.webp', 'Why are you worring?'],
      ['get-up.webp', 'Good morning, Misaka!'],
    ],
  },
};

export default class ImageMasonry extends HTMLElement {
  static get is() {
    return 'image-masonry';
  }
  connectedCallback() {
    // Because typography system uses class for styles, I can not use shadow root.
    // this.attachShadow({ mode: 'open' });
    this.innerHTML = /* html */ `
      <span class="divider _1" aria-hidden="true"></span>
      <span class="divider _2" aria-hidden="true"></span>
    `;
    window.addEventListener('resize', this.handleResize.bind(this));
    this.loadData();
  }
  get divider1() {
    return this.querySelector('.divider._1');
  }

  numberLoadOnce = 12;
  loaded = 0;
  appeared = 0;
  /**
   * @returns {number}
   */
  getColNum() {
    const width = window.innerWidth;
    const _colNum =
      width > 1580 ? 3 : width > 1200 ? 2 : width > 1000 ? 3 : width > 900 ? 2 : width > 780 ? 3 : width > 480 ? 2 : 1;
    return _colNum;
  }
  updColNum() {
    const _colNum = this.getColNum();
    this.setAttribute('col', `${_colNum}`);
    this.style.setProperty('--image-masonry-image-width', 100 / _colNum + '%');
    this.style.setProperty('--image-masonry-images-a-col', `${_colNum}`);
    return _colNum;
  }
  get colHeights() {
    let _colHeights = [0, 0, 0, 0];
    this.querySelectorAll(':scope > div').forEach((container, index) => {
      const containerHeight = container.clientHeight;
      const colIndex = (index + 1) % this.getColNum();
      _colHeights[colIndex] += containerHeight;
    });
    return _colHeights;
  }
  observer;

  loadData() {
    for (let i = 0; i < this.numberLoadOnce; i++) {
      this.createContainer(i);
    }
  }
  async createContainer(i) {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.visibility = 'hidden';

    const img = await this.loadImage();
    if (img) {
      container.append(img);
      this.appendChild(container);
      this.insertBefore(container, this.divider1);

      // show
      container.style.position = '';
      container.style.visibility = '';
      container.classList.add('show');
      this.appeared++;
      this.updateHeight();

      // load more when last container shows
      if (i === this.numberLoadOnce - 1) {
        this.observe(container);
      }
    }
  }
  observe(container) {
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries.length === 1 && entries[0].isIntersecting) {
          this.loadData();
          this.observer.unobserve(entries[0].target);
        }
      });
    }
    this.observer.observe(container);
  }
  /**
   * @returns {Promise}
   */
  async loadImage() {
    const personInfo = imageDatas[this.getAttribute('data') || 'misaka-mikoto'];
    const imageInfo = imageDatas[this.getAttribute('data') || 'misaka-mikoto']['list'][this.loaded];
    if (!imageInfo) return;
    this.loaded++;
    const img = document.createElement('img');
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = (personInfo['prefix'] || '') + imageInfo[0];
      img.alt = imageInfo[1];
    });
  }
  updateHeight() {
    this.updColNum();
    this.style.height = Math.max(...this.colHeights) + 10 + 'px';
  }
  handleResize() {
    this.updateHeight();
  }
}
customElements.define(ImageMasonry.is, ImageMasonry);
