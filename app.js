const routes = {
  404: { page: '/pages/404.html' },
  '/': { page: '/pages/home.html' },
  '/discuss': {},
  '/about': {},
  '/links': {},
  '/lab': {},
  '/wiki': {},
  '/wiki/misaka-mikoto': {},
  '/wiki/shirai-kuroko': {},
  '/wiki/accelerator': {},
  '/images': {},
  '/images/misaka-mikoto': {},
};

/**
 * @returns {HTMLElement|null}
 */
const getRoot = () => {
  return document.querySelector('#main-contents');
};
/**
 * @param {string} location
 */
const updateSPALinkActive = (location) => {
  document.querySelector('[spa-link-active]')?.removeAttribute('spa-link-active');
  document.querySelector(`[href="${location}"]`)?.setAttribute('spa-link-active', '');
};
/**
 * @param {HTMLElement} root
 */
const addClasses = (root) => {
  root.querySelectorAll('h1').forEach((el) => el.classList.add('display-large'));
  root.querySelectorAll('h2').forEach((el) => el.classList.add('display-medium'));
  root.querySelectorAll('h3').forEach((el) => el.classList.add('display-small'));
  root.querySelectorAll('p, ul').forEach((el) => el.classList.add('body-large'));
  root.querySelectorAll('.block').forEach((el) => el.setAttribute('role', 'region'));
};
/**
 * @param {HTMLElement} root
 */
const fillSVG = (root) => {
  root
    .querySelectorAll('li')
    .forEach(
      (el) =>
        (el.innerHTML =
          `<svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4.95843 0.279933C5.5378 -0.353974 6.58452 0.173492 6.41974 1.01632L6.05454 2.88412C5.99767 3.17501 6.09646 3.47451 6.31525 3.67447L7.72007 4.95843C8.35397 5.5378 7.82651 6.58452 6.98368 6.41974L5.11588 6.05454C4.82499 5.99767 4.52549 6.09646 4.32553 6.31525L3.04157 7.72007C2.4622 8.35397 1.41548 7.82651 1.58026 6.98368L1.94545 5.11588C2.00233 4.82499 1.90354 4.52549 1.68475 4.32553L0.279933 3.04157C-0.353974 2.4622 0.173492 1.41548 1.01632 1.58026L2.88412 1.94545C3.17501 2.00233 3.47451 1.90354 3.67447 1.68475L4.95843 0.279933Z" /></svg>` +
          el.innerHTML)
    );
};
/**
 * @param {HTMLElement} root
 */
const runJavaScript = (root) => {
  root.querySelectorAll('script[dynamic-run]').forEach((el) => {
    const runnableScriptBlock = document.createElement('script');
    runnableScriptBlock.type = 'module';
    runnableScriptBlock.textContent = el.textContent;
    root.appendChild(runnableScriptBlock);
  });
};

const renderPage = async () => {
  const location = window.location.pathname;
  const route = routes[location] || routes[404];
  const response = await fetch(route.page ? route.page : '/pages' + location + '.html');
  const data = await response.text();
  const root = getRoot();
  root ? (root.innerHTML = data) : null;
  root ? addClasses(root) : null;
  root ? fillSVG(root) : null;
  root ? runJavaScript(root) : null;
  updateSPALinkActive(location);
};

/**
 * @param {Event} e
 */
const useRoute = (e) => {
  e = e || window.event;
  e.preventDefault();
  // @ts-ignore
  window.history.pushState({ page: window.location.pathname }, '', e.target.href);
  renderPage();
};

/**
 * @param {MouseEvent} e
 */
const handleClick = (e) => {
  // @ts-ignore
  if (e.target.hasAttribute('spa-link')) {
    e.preventDefault();
    useRoute(e);
  }
};
window.addEventListener('click', handleClick);

window.onpopstate = renderPage;
// @ts-ignore
window.useRoute = useRoute;
renderPage();

/** @type {HTMLDivElement|null} */
const drawerRoot = document.querySelector('.drawer__root');
/** @type {HTMLElement|null} */
const drawer = document.querySelector('.drawer');
// @ts-ignore
const drawerTrap = focusTrap.createFocusTrap(drawerRoot);
const updateDrawerFocusTrap = () => {
  if (window.innerWidth < 1200 && drawerRoot?.classList.contains('drawer--opened')) {
    drawerTrap.activate();
  } else {
    drawerTrap.deactivate();
  }
};
/** @type {HTMLButtonElement|null} */
const drawerOpener = document.querySelector('.drawer__opener');
/** @type {HTMLButtonElement|null} */
const drawerCloser = document.querySelector('.drawer__closer');
/** @type {HTMLElement|null} */
const drawerOverlap = document.querySelector('.drawer__overlap');
const openDrawer = () => {
  setTimeout(() => {
    drawerRoot?.classList.add('open-animating');
    setTimeout(() => {
      drawerRoot?.classList.remove('open-animating');
      drawerRoot?.classList.add('drawer--opened');
      drawer?.focus();
      updateDrawerFocusTrap();
    }, 10);
  }, 10);
};
const closeDrawer = () => {
  setTimeout(() => {
    drawerRoot?.classList.add('close-animating');
    setTimeout(() => {
      drawerRoot?.classList.remove('close-animating');
      drawerRoot?.classList.remove('drawer--opened');
      drawerOpener?.focus();
      updateDrawerFocusTrap();
    }, 240);
  }, 10);
};
/**
 * @param {MouseEvent} e
 */
const handleDrawerClick = (e) => {
  if (window.innerWidth >= 1200) return;
  /** @type {string} */
  // @ts-ignore
  const tagName = e.target.tagName;
  let flag = false;
  // @ts-ignore
  if (tagName === 'BUTTON' && !e.target.disabled && !e.target.classList.contains('drawer__closer')) flag = true;
  // @ts-ignore
  else if (tagName === 'A' && e.target.href) flag = true;
  if (flag) closeDrawer();
};
/**
 * @param {KeyboardEvent} e
 */
const handleDrawerKeyDown = (e) => {
  const key = e.key;
  switch (key) {
    case 'Escape':
    case 'ESC':
      closeDrawer();
      break;
    default:
      break;
  }
};
drawerOpener?.addEventListener('click', openDrawer);
drawerCloser?.addEventListener('click', closeDrawer);
drawerOverlap?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', handleDrawerClick);
drawer?.addEventListener('keydown', handleDrawerKeyDown);

window.addEventListener('resize', updateDrawerFocusTrap);
updateDrawerFocusTrap();

import UpdateTitle from './components/update-title.js';
import UpdateDescription from './components/update-description.js';
import ConCard from './components/con-card.js';
import LinksCard from './components/links-card.js';
import ImageMasonry from './components/image-masonry.js';
import InvText from './components/inv-text.js';
