import apiFetch from '@wordpress/api-fetch';

// Middleware
apiFetch.use(apiFetch.createNonceMiddleware(window.wpApiSettings.nonce));
apiFetch.use(apiFetch.createRootURLMiddleware(window.wpApiSettings.root));
