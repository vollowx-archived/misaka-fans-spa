const routes = {
  404: { page: '/pages/404.html' },
  '/': { page: '/pages/home.html' },
  '/about': {},
  '/links': {},
  '/lab': {},
  '/about/misaka-mikoto': {},
  '/about/accelerator': {},
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

const renderPage = async () => {
  const location = window.location.pathname;
  const route = routes[location] || routes[404];
  const response = await fetch(route.page ? route.page : '/pages' + location + '.html');
  const data = await response.text();
  const root = getRoot();
  root ? (root.innerHTML = data) : null;
  root ? addClasses(root) : null;
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

import UpdateTitle from './components/update-title.js';
import UpdateDescription from './components/update-description.js';
import LinksCard from './components/links-card.js';
import ImageMasonry from './components/image-masonry.js';
