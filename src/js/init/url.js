import * as url from '@wordpress/url/build-module';

if (window.wp.url) {
  const props = Object.keys(url);

  props.forEach(prop => {
    window.wp.url[prop] = window.wp.url[prop] || url[prop];
  });
}
else {
  window.wp.url = url;
}
