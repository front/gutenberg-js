/**
 * Internal dependencies
 */
import './wp-init.js';
import '../scss/style.scss';
import '@wordpress/core-data';

/**
 * WordPress dependencies
 */
import * as i18n from '@wordpress/i18n';
import * as blocks from '@wordpress/blocks';
import * as components from '@wordpress/components';
import * as blockLibrary from '@wordpress/block-library';
import * as element from '@wordpress/element';
import * as data from '@wordpress/data';
import * as editor from '@wordpress/editor';
import * as editPost from '@wordpress/edit-post';
import * as plugins from '@wordpress/plugins';

// Adding modules to global wp
window.wp = window.wp || {};
window.wp.blocks = window.wp.blocks || blocks;
window.wp.i18n = window.wp.i18n || i18n;
window.wp.components = window.wp.components || components;
window.wp.blockLibrary = window.wp.blockLibrary || blockLibrary;
window.wp.element = window.wp.element || element;
window.wp.data = window.wp.data || data;
window.wp.editor = window.wp.editor || editor;
window.wp.editPost = window.wp.data || editPost;
window.wp.plugins = window.wp.data || plugins;

export {
  i18n,
  blocks,
  components,
  blockLibrary,
  element,
  data,
  editor,
  editPost,
  plugins,
};
