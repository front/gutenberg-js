/**
 * Internal dependencies
 */
import './wp-init.js';
import '../scss/style.scss';

/**
 * WordPress dependencies
 */
import * as blockLibrary from '@wordpress/block-library';
import * as blocks from '@wordpress/blocks';
import * as components from '@wordpress/components';
import * as compose from '@wordpress/compose';
import * as coreData from '@wordpress/core-data';
import * as data from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import * as editor from '@wordpress/editor';
import * as editPost from '@wordpress/edit-post';
import * as element from '@wordpress/element';
import * as hooks from '@wordpress/hooks';
import * as i18n from '@wordpress/i18n';
import * as plugins from '@wordpress/plugins';

// and styles
import 'gutenberg/block-library/editor.scss';
import 'gutenberg/block-library/theme.scss';
import 'gutenberg/block-library/style.scss';

// Adding modules to wp global
window.wp.blockLibrary = blockLibrary;
window.wp.blocks = blocks;
window.wp.components = components;
window.wp.compose = compose;
window.wp.coreData = coreData;
window.wp.data = data;
window.wp.domReady = domReady;
window.wp.editor = {
  ...window.wp.editor,
  ...editor,
};
window.wp.editPost = editPost;
window.wp.element = element;
window.wp.hooks = hooks;
window.wp.i18n = i18n;
window.wp.plugins = plugins;

export {
  blockLibrary,
  blocks,
  components,
  compose,
  coreData,
  data,
  domReady,
  editor,
  editPost,
  element,
  hooks,
  i18n,
  plugins,
};
