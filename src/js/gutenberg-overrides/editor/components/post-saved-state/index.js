/**
 * WordPress dependencies
 */
import { ifCondition, withSafeTimeout } from '@wordpress/components';
import { compose } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';

import * as others from 'gutenberg/editor/components/post-saved-state?source=node_modules';

const { PostSavedState } = others;

export default compose([
  withSelect((select, { forceIsDirty, forceIsSaving }) => {
    const {
      isEditedPostNew,
      isCurrentPostPublished,
      isEditedPostDirty,
      isSavingPost,
      isEditedPostSaveable,
      getCurrentPost,
      isAutosavingPost,
      // extracting getEditorSettings
      getEditorSettings,
    } = select('core/editor');

    // getting canSave setting
    const { canSave } = getEditorSettings();

    return {
      post: getCurrentPost(),
      isNew: isEditedPostNew(),
      isPublished: isCurrentPostPublished(),
      isDirty: forceIsDirty || isEditedPostDirty(),
      isSaving: forceIsSaving || isSavingPost(),
      isSaveable: isEditedPostSaveable(),
      isAutosaving: isAutosavingPost(),

      // adding canSave to props
      canSave,
    };
  }),
  withDispatch(dispatch => ({
    onSave: dispatch('core/editor').savePost,
  })),
  withSafeTimeout,

  // added ifCondition to enable/disable 
  // the Save button according 'canSave' setting
  ifCondition(({ canSave }) => canSave),
])(PostSavedState);

export * from 'gutenberg/editor/components/post-saved-state?source=node_modules';
