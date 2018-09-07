/**
 * External dependencies
 */
import React from 'react';
import jQuery from 'jquery';
import tinymce from 'tinymce';
import memoize from 'memize';

import * as url from 'gutenberg/packages/url/build-module/index';

window.jQuery = window.jQuery || jQuery;
window.tinymce = window.tinymce || tinymce;
window.React = window.React || React;

window.wp = window.wp || {};

// apiFetch
window.wp.apiFetch = window.wp.apiFetch || function (options) {
  // do something here (this should be a promise)
  return jQuery.ajax(options);
};

// URL
window.wp.url = window.wp.url || {};
window.wp.url.addQueryArgs = window.wp.url.addQueryArgs || url.addQueryArgs;
window.wp.url.isURL = window.wp.url.isURL || url.isURL;
window.wp.url.prependHTTP = window.wp.url.prependHTTP || url.prependHTTP;

window.wp.shortcode = window.wp.shortcode || {};
window.wp.shortcode.regexp = window.wp.shortcode.regexp || memoize(function (tag) {
  return new RegExp('\\[(\\[?)(' + tag + ')(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)', 'g');
});

window.wp.editor = window.wp.editor || {};
window.wp.editor.getDefaultSettings = window.wp.editor.getDefaultSettings || function () {
  return {
    tinymce: {
      indent: true,
      keep_styles: false,
      menubar: false,
      plugins: 'charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen',
      resize: 'vertical',
      skin: 'lightgray',
      theme: 'modern',
      toolbar1: 'bold,italic,bullist,numlist,link',
    },
    quicktags: {
      buttons: 'strong,em,link,ul,ol,li,code',
    },
  };
};

window.wp.editor.autop = window.wp.editor.autop || function () {};
window.wp.editor.getContent = window.wp.editor.getContent || function (id) {
  const editor = window.tinymce.get(id);

  if (editor && ! editor.isHidden()) {
    editor.save();
  }

  return jQuery('#' + id).val();
};
window.wp.editor.initialize = window.wp.editor.initialize || function (id, settings = { tinymce: true }) {
  const defaults = window.wp.editor.getDefaultSettings();
  const init = jQuery.extend({}, defaults.tinymce, settings.tinymce);

  init.selector = '#' + id;

  window.tinymce.init(init);

  if (! window.wpActiveEditor) {
    window.wpActiveEditor = id;
  }
};
window.wp.editor.remove = window.wp.editor.remove || function (id) {
  const mceInstance = window.tinymce.get(id);

  if (mceInstance) {
    if (! mceInstance.isHidden()) {
      mceInstance.save();
    }

    mceInstance.remove();
  }
};
window.wp.editor.removep = window.wp.editor.removep || function () {};

window.wp.oldEditor = window.wp.editor;

// wp api
window.wp.api = window.wp.api || {};

window.wp.api.models = window.wp.api.models || {};
window.wp.api.collections = window.wp.api.collections || {};
window.wp.api.views = window.wp.api.views || {};

// postTypes
window.wp.api.postTypeRestBaseMapping = window.wp.api.postTypeRestBaseMapping || {
  attachment: 'media',
  custom_css: 'custom_css',
  customize_changeset: 'customize_changeset',
  nav_menu_item: 'nav_menu_item',
  oembed_cache: 'oembed_cache',
  page: 'pages',
  post: 'posts',
  revision: 'revision',
  user_request: 'user_request',
  wp_block: 'blocks',
};
window.wp.api.getPostTypeRoute = window.wp.api.getPostTypeRoute || function (postType) {
  return window.wp.api.postTypeRestBaseMapping[ postType ];
};

// taxonomies
window.wp.api.taxonomyRestBaseMapping = window.wp.api.taxonomyRestBaseMapping || {
  category: 'categories',
  link_category: 'link_category',
  nav_menu : 'nav_menu',
  post_format : 'post_format',
  post_tag : 'tags',
};
window.wp.api.getTaxonomyRoute = window.wp.api.getTaxonomyRoute || function (taxonomy) {
  return window.wp.api.taxonomyRestBaseMapping[ taxonomy ];
};

// User settings
window.userSettings = window.userSettings || {};
window.userSettings.uid = window.userSettings.uid || 1;

// Editor l10n settings
window.wpEditorL10n = window.wpEditorL10n || {
  tinymce: {
    baseUrl: 'node_modules/tinymce',
    settings: {
      external_plugins: [],
      plugins: 'charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen', // ,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview',
      toolbar1: 'formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,kitchensink',
      toolbar2: 'strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help',
      toolbar3: '',
      toolbar4: '',
    },
    suffix: '.min',
  },
};

// API settings
window.wpApiSettings = window.wpApiSettings || {};
window.wpApiSettings.root = window.wpApiSettings.root || window.location.origin;
window.wpApiSettings.nonce = window.wpApiSettings.nonce || '123456789';
window.wpApiSettings.schema = window.wpApiSettings.schema || {};
window.wpApiSettings.schema.routes = window.wpApiSettings.schema.routes || {};
// window.wpApiSettings.schema.routes[ '/wp/v2/posts' ] = window.wpApiSettings.schema.routes[ '/wp/v2/posts' ] || { methods: [ 'GET' ] };
// window.wpApiSettings.schema.routes[ '/wp/v2/posts/(?P<id>[\\d]+)' ] = window.wpApiSettings.schema.routes[ '/wp/v2/posts/(?P<id>[\\d]+)' ] || { methods: [ 'GET' ] };
// window.wpApiSettings.schema.routes[ '/wp/v2/media' ] = window.wpApiSettings.schema.routes[ '/wp/v2/media' ] || { methods: [ 'GET' ] };
// window.wpApiSettings.schema.routes[ '/wp/v2/media/(?P<id>[\\d]+)' ] = window.wpApiSettings.schema.routes[ '/wp/v2/media/(?P<id>[\\d]+)' ] || { methods: [ 'GET' ] };
