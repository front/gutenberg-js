import * as oUrl from 'gutenberg/packages/url/build-module';

export const url = {
  ...oUrl,
  ...window.wp.url,
};
