import * as url from 'gutenberg/packages/url/build-module';

if (window.wp.url) {
  const props = Object.keys(url);

  props.forEach(prop => {
    window.wp.url[prop] = window.wp.url[prop] || url[prop];
  });
}
else {
  window.wp.url = url;
}
