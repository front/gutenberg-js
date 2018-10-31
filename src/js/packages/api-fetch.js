import oApiFetch from 'gutenberg/packages/api-fetch/build-module';

// API settings
window.wpApiSettings = window.wpApiSettings || {};
window.wpApiSettings.root = window.wpApiSettings.root || window.location.origin;
window.wpApiSettings.nonce = window.wpApiSettings.nonce || '123456789';
window.wpApiSettings.versionString = window.wpApiSettings.versionString || 'wp/v2/';

// apiFetch
const apiFetch = window.wp.apiFetch || oApiFetch;
apiFetch.use = window.wp.apiFetch.use || oApiFetch.use;
apiFetch.createNonceMiddleware = window.wp.apiFetch.createNonceMiddleware || oApiFetch.createNonceMiddleware;
apiFetch.createPreloadingMiddleware = window.wp.apiFetch.createPreloadingMiddleware || oApiFetch.createPreloadingMiddleware;
apiFetch.createRootURLMiddleware = window.wp.apiFetch.createRootURLMiddleware || oApiFetch.createRootURLMiddleware;
apiFetch.fetchAllMiddleware = window.wp.apiFetch.fetchAllMiddleware || oApiFetch.fetchAllMiddleware;

// Middleware
apiFetch.use(apiFetch.createNonceMiddleware(window.wpApiSettings.nonce));
apiFetch.use(apiFetch.createRootURLMiddleware(window.wpApiSettings.root));

export default apiFetch;
