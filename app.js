const routes = {
  404: {},
  '/': {
    page: '/pages/home.html',
  },
  '/about': {},
  '/lab': {},
  '/about/misaka-mikoto': {},
};

/**
 * @returns {HTMLElement|null}
 */
const getRoot = () => {
  return document.querySelector('#main-contents');
};

const renderPage = async () => {
  const location = window.location.pathname;
  const route = routes[location] || routes[404];
  const response = await fetch(route.page ? route.page : '/pages' + location + '.html');
  const data = await response.text();
  const root = getRoot();
  root ? (root.innerHTML = data) : null;
  document.querySelector('[spa-link-active]')?.removeAttribute('spa-link-active');
  document.querySelector(`[href="${location}"]`)?.setAttribute('spa-link-active', '');
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
