window.wp = window.wp || {};

// User settings
window.userSettings = window.userSettings || {
  secure: '',
  time: 1234567,
  uid: 1,
};

// API settings
window.wpApiSettings = window.wpApiSettings || {};
window.wpApiSettingsroot = window.wpApiSettings.root || window.location.origin;
window.wpApiSettingsnonce = window.wpApiSettings.nonce || '123456789';
window.wpApiSettingsversionString = window.wpApiSettings.versionString || 'wp/v2/';

// postboxes
window.postboxes = window.postboxes || {
  add_postbox_toggles: (page, args) => {
    console.log('page', page);
    console.log('args', args);
  },
};

// editorL10n
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
