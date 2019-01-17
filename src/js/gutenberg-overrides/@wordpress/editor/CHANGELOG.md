# editor changelog

## 4.0.0

### Changed

- Moved 'post-publish-panel' override from toggle.js to index.js. `PostPublishPanelToggle` has been deprecated and no longer exists.

## 3.0.0

### Removed

- BlockDropZone override

- BlockListBlock override

- `insertDefaultBlock` action override

- mediaUpload override

### Added

- 'post-publish-button' override

- 'post-preview-button' override

- `addQueryArgs` to 'Manage All Reusable Blocks' link (Inserter Menu) ([packages/editor/build-module/components/inserter/menu.js](https://github.com/front/gutenberg-js/blob/v2.7.0/src/js/gutenberg-overrides/packages/editor/build-module/components/inserter/menu.js))

## 2.5.0 2018-09-19

### Changed

- media-upload overrides according gutenberg 3.8.0 and moved it to `packages/editor/build-module/utils/media-upload/media-upload.js`

## 2.0.0 2018-08-30

### Changed

- editor overrides to `packages/editor/build-module` folder

## 1.2.0 2018-07-28

### Changed

- `onDrop` adding a workaround (`checkEditor`) to check if the editor was initialized before set the content ([editor/components/rich-text/index.js](https://github.com/front/gutenberg-js/blob/v1.2.0/src/js/gutenberg-overrides/editor/components/rich-text/index.js))

- `onPastePreProcess` checking if is a dropped post (with attributes) ([editor/components/rich-text/index.js](https://github.com/front/gutenberg-js/blob/v1.2.0/src/js/gutenberg-overrides/editor/components/rich-text/index.js))

## 1.1.0 2018-07-27

### Added

- `ui` prop in BlockDropZone call ([editor/components/block-list/block.js](https://github.com/front/gutenberg-js/blob/v1.1.0/src/js/gutenberg-overrides/editor/components/block-list/block.js))

### Changed

- `blocks` to `attribute` and `updateBlockAttributes` instead of insert a new one, in `onDrop` ([editor/components/block-drop-zone/index.js](https://github.com/front/gutenberg-js/blob/v1.1.0/src/js/gutenberg-overrides/editor/components/block-drop-zone/index.js))

## 0.0.1 2018-07-11

### Added

- `canPublish`, `canSave` and `canAutosave` properties and default values to `EDITOR_SETTINGS_DEFAULTS` ([editor/store/defaults.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/store/defaults.js))

- `insertDefaultBlock` override ([editor/store/actions.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/store/actions.js))

- `ifCondition` to **AutosaveMonitor**, controlled by `canSave` and `canAutosave` settings ([editor/components/autosave-monitor/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/autosave-monitor/index.js))

- `ifCondition` to **PostPublishPanelToggle**, controlled by `canPublish` setting ([editor/components/post-publish-panel/toggle.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/post-publish-panel/toggle.js))

- `ifCondition` to **PostSavedState**, controlled by `canSave` setting ([editor/components/post-saved-state/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/post-saved-state/index.js))

- `setContent` override (commented `bookmark` workaround) ([editor/components/rich-text/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/rich-text/index.js))

- `onDrop` override in order to accept blocks from PostItemDraggable  ([editor/components/block-drop-zone/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/block-drop-zone/index.js))

- `INSERTER_UTILITY_HIGH`, `INSERTER_UTILITY_MEDIUM` and `INSERTER_UTILITY_LOW` overrides with `INSERTER_UTILITY_NONE` so there is no different levels of utility and consequently no **Most Used** panel ([editor/store/selectors.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/store/selectors.js))

- `data` property to `mediaObject` and use `get` function to obtain image `title` in `mediaUpload` function ([utils/mediaupload.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/utils/mediaupload.js))
