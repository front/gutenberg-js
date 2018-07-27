# editor changelog

## 1.1.0 2018-07-27

### Added

- `ui` prop in BlockDropZone call ([editor/components/block-list/block.js](https://github.com/front/gutenberg-js/blob/v1.1.0/src/js/gutenberg-overrides/editor/components/block-list/block.js))

### Changed

- `blocks` to `attribute` and `updateBlockAttributes` instead of insert a new one, in `onDrop` ([editor/components/block-drop-zone/index.js](https://github.com/front/gutenberg-js/blob/v1.1.0/src/js/gutenberg-overrides/editor/components/block-drop-zone/index.js))

## 0.0.1 2018-07-11

### Added

- `canPublish`, `canSave` and `canAutosave` properties and default values to `EDITOR_SETTINGS_DEFAULTS` ([editor/store/defaults.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/store/defaults.js))

- `insertDefaultBlock` override ([editor/store/actions.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/

- `ifCondition` to **AutosaveMonitor**, controlled by `canSave` and `canAutosave` settings ([editor/components/autosave-monitor/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/autosave-monitor/index.js))

- `ifCondition` to **PostPublishPanelToggle**, controlled by `canPublish` setting ([editor/components/post-publish-panel/toggle.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/post-publish-panel/toggle.js))

- `ifCondition` to **PostSavedState**, controlled by `canSave` setting ([editor/components/post-saved-state/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/post-saved-state/index.js))

- `setContent` override (commented `bookmark` workaround) ([editor/components/rich-text/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/rich-text/index.js))

- `onDrop` override in order to accept blocks from PostItemDraggable  ([editor/components/block-drop-zone/index.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/components/block-drop-zone/index.js))

- `INSERTER_UTILITY_HIGH`, `INSERTER_UTILITY_MEDIUM` and `INSERTER_UTILITY_LOW` overrides with `INSERTER_UTILITY_NONE` so there is no different levels of utility and consequently no **Most Used** panel ([editor/store/selectors.js](https://github.com/front/gutenberg-js/blob/v0.0.1/src/js/gutenberg-overrides/editor/store/selectors.js))
