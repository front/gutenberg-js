import * as others from 'gutenberg/packages/editor/build-module/store/defaults?source=node_modules';

// Properties to handle with save and publish features
others.EDITOR_SETTINGS_DEFAULTS.canPublish = true;
others.EDITOR_SETTINGS_DEFAULTS.canSave = true;
others.EDITOR_SETTINGS_DEFAULTS.canAutosave = true;

export * from 'gutenberg/packages/editor/build-module/store/defaults?source=node_modules';
