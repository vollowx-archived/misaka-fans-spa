const sharedTitle = 'tiny-material docs';
const titleSeparator = ' | ';

const routes = {
  404: {
    page: '/pages/404.html',
    title: '404 page not found' + titleSeparator + sharedTitle,
    description: '404 page not found.',
  },
  '/': {
    page: '/pages/home.html',
    title: 'Home' + titleSeparator + sharedTitle,
    description: 'tiny-material. Providing accessible components with Web Components & Material You',
  },
  '/about': {
    page: '/pages/about.html',
    title: 'About' + titleSeparator + sharedTitle,
    description: 'About tiny-material.',
  },
  '/components/common-button': {
    page: '/pages/components/common-button.html',
    title: 'Common button' + titleSeparator + sharedTitle,
    description: 'Common button.',
  },
  '/components/fab': {
    page: '/pages/components/fab.html',
    title: 'FAB' + titleSeparator + sharedTitle,
    description: 'Floating action button.',
  },
};

/**
 * @returns {HTMLElement|null}
 */
const getRoot = () => {
  return document.querySelector('#root');
};
/**
 * @returns {HTMLMetaElement}
 */
const getDescription = () => {
  /** @type {HTMLMetaElement|null} */
  const el = document.querySelector('meta[name="description"]');
  if (el) {
    return el;
  } else {
    const newEl = document.createElement('meta');
    newEl.name = 'description';
    return newEl;
  }
};

const renderPage = async () => {
  const location = window.location.pathname;
  const route = routes[location] || routes[404];
  const response = await fetch(route.page);
  const data = await response.text();
  const root = getRoot();
  root ? (root.innerHTML = data) : null;
  document.title = route.title;
  getDescription().content = route.description;
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
  if (e.target.matches('a')) {
    e.preventDefault();
    useRoute(e);
  }
};
const aside = document.querySelector('aside');
aside?.addEventListener('click', handleClick);

window.onpopstate = renderPage;
// @ts-ignore
window.useRoute = useRoute;
renderPage();
