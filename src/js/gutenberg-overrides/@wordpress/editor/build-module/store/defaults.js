import * as others from '@wordpress/editor/build-module/store/defaults?source=node_modules';

// Properties to handle with save and publish features
others.EDITOR_SETTINGS_DEFAULTS.canPublish = true;
others.EDITOR_SETTINGS_DEFAULTS.canSave = true;
others.EDITOR_SETTINGS_DEFAULTS.canAutosave = true;

// Property to show/hide media library option
others.EDITOR_SETTINGS_DEFAULTS.mediaLibrary = true;

export * from '@wordpress/editor/build-module/store/defaults?source=node_modules';
