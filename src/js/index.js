/**
 * WordPress dependencies
 */
import * as autop from '@wordpress/autop';
import * as blob from '@wordpress/blob';
import * as blockSerializationDefaultParser from '@wordpress/block-serialization-default-parser';

import * as escapeHtml from '@wordpress/escape-html';
import * as element from '@wordpress/element';
import * as isShallowEqual from '@wordpress/is-shallow-equal';
import * as compose from '@wordpress/compose';
import * as hooks from '@wordpress/hooks';
import deprecated from '@wordpress/deprecated';
import * as reduxRoutine from '@wordpress/redux-routine';

import * as data from '@wordpress/data';
import './packages/data.js';

import * as dom from '@wordpress/dom';
import * as i18n from '@wordpress/i18n';
import * as shortcode from '@wordpress/shortcode';
import * as blocks from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import * as a11y from '@wordpress/a11y';

import * as url from './packages/url.js';
import * as apiFetch from './packages/api-fetch.js';

import * as htmlEntities from '@wordpress/html-entities';
import * as keycodes from '@wordpress/keycodes';
import * as richText from '@wordpress/rich-text';
import * as components from '@wordpress/components';

import * as coreData from '@wordpress/core-data';

import * as date from '@wordpress/date';
import * as nux from '@wordpress/nux';
import * as tokenList from '@wordpress/token-list';
import * as viewport from '@wordpress/viewport';
import * as wordcount from '@wordpress/wordcount';

import * as editor from '@wordpress/editor';
import * as oldEditorFunctions from './oldEditor.js';

import * as plugins from '@wordpress/plugins';
import * as blockLibrary from '@wordpress/block-library';
import * as editPost from '@wordpress/edit-post';

// Style
import 'gutenberg/packages/components/build-style/style.css';
import 'gutenberg/packages/nux/build-style/style.css';
import 'gutenberg/packages/editor/build-style/style.css';
import 'gutenberg/packages/block-library/build-style/theme.css';
import 'gutenberg/packages/block-library/build-style/editor.css';
import 'gutenberg/packages/edit-post/build-style/style.css';
import '../scss/style.scss';

const oldEditor = {
  ...oldEditorFunctions,
  ...editor,
};

// Set global wp
window.wp = {
  apiFetch,
  url,

  autop,
  blob,
  blockSerializationDefaultParser,
  escapeHtml,
  element,
  isShallowEqual,
  compose,
  hooks,
  deprecated,
  reduxRoutine,
  data,
  dom,
  i18n,
  shortcode,
  blocks,
  domReady,
  a11y,
  htmlEntities,
  keycodes,
  richText,
  components,
  coreData,
  date,
  nux,
  tokenList,
  viewport,
  wordcount,
  editor,
  oldEditor,
  plugins,
  blockLibrary,
  editPost,
  // ...window.wp,
};

// User settings
window.userSettings = window.userSettings || {
  secure: '',
  time: 1234567,
  uid: 1,
};

// postboxes
window.postboxes = window.postboxes || {
  add_postbox_toggles: (page, args) => {
    console.log('page', page);
    console.log('args', args);
  },
};

export {
  apiFetch,
  url,

  autop,
  blob,
  blockSerializationDefaultParser,
  escapeHtml,
  element,
  isShallowEqual,
  compose,
  hooks,
  deprecated,
  reduxRoutine,
  data,
  dom,
  i18n,
  shortcode,
  blocks,
  domReady,
  a11y,
  htmlEntities,
  keycodes,
  richText,
  components,
  coreData,
  date,
  nux,
  tokenList,
  viewport,
  wordcount,
  editor,
  oldEditor,
  plugins,
  blockLibrary,
  editPost,
};
