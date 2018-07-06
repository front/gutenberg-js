import { ifCondition } from '@wordpress/components';
import { compose } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';

import * as others from 'gutenberg/editor/components/autosave-monitor?source=node_modules';

const { AutosaveMonitor } = others;

export default compose([
  withSelect(select => {
    const {
      isEditedPostDirty,
      isEditedPostAutosaveable,
      getEditorSettings,
    } = select('core/editor');

    const { autosaveInterval, canSave, canAutosave } = getEditorSettings();

    return {
      isDirty: isEditedPostDirty(),
      isAutosaveable: isEditedPostAutosaveable(),
      autosaveInterval,
      canSave,
      canAutosave,
    };
  }),
  withDispatch(dispatch => ({
    autosave: dispatch('core/editor').autosave,
  })),
  // added ifCondition to enable/disable 
  // the autoave feature according 'canSave' and 'canAutosave' settings
  ifCondition(({ canSave, canAutosave }) => canSave && canAutosave),
])(AutosaveMonitor);

export * from 'gutenberg/editor/components/autosave-monitor?source=node_modules';
