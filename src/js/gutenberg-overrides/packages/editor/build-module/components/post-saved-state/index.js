/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { ifCondition, withSafeTimeout, compose } from '@wordpress/compose';

import * as others from 'gutenberg/packages/editor/build-module/components/post-saved-state?source=node_modules';

const { PostSavedState } = others;

export default compose([
  withSelect((select, { forceIsDirty, forceIsSaving }) => {
    const {
      isEditedPostNew,
      isCurrentPostPublished,
      isCurrentPostScheduled,
      isEditedPostDirty,
      isSavingPost,
      isEditedPostSaveable,
      getCurrentPost,
      isAutosavingPost,
      // extracting getEditorSettings
      getEditorSettings, // GUTENBERG JS
    } = select('core/editor');

    // getting canSave setting
    const { canSave } = getEditorSettings();

    return {
      post: getCurrentPost(),
      isNew: isEditedPostNew(),
      isPublished: isCurrentPostPublished(),
      isScheduled: isCurrentPostScheduled(),
      isDirty: forceIsDirty || isEditedPostDirty(),
      isSaving: forceIsSaving || isSavingPost(),
      isSaveable: isEditedPostSaveable(),
      isAutosaving: isAutosavingPost(),

      // GUTENBERG JS
      // adding canSave to props
      canSave,
    };
  }),
  withDispatch(dispatch => ({
    onSave: dispatch('core/editor').savePost,
  })),
  withSafeTimeout,
  // GUTENBERG JS
  // added ifCondition to enable/disable
  // the Save button according 'canSave' setting
  ifCondition(({ canSave }) => canSave),
])(PostSavedState);

export * from 'gutenberg/packages/editor/build-module/components/post-saved-state?source=node_modules';
