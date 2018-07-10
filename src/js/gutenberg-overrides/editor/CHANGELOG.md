# editor changelog

## 0.0.1 2018-07-

### Added

- `canPublish`, `canSave` and `canAutosave` properties and default values to `EDITOR_SETTINGS_DEFAULTS` (`store/defaults.js`)

- `insertDefaultBlock` override (`store/actions.js`)

- `ifCondition` to **AutosaveMonitor**, controlled by `canSave` and `canAutosave` settings (`components/autosave-monitor/index.js`)

- `ifCondition` to **PostPublishPanelToggle**, controlled by `canPublish` setting (`components/post-publish-panel/toggle.js`)

- `ifCondition` to **PostSavedState**, controlled by `canSave` setting (`components/post-saved-state/index.js`)

- `setContent` override (commented `bookmark` workaround) (`components/rich-text/index.js`)
