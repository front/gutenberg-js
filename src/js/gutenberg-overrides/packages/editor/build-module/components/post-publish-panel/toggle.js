/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * WordPress Dependencies
 */
import { compose, ifCondition } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

import * as others from 'gutenberg/packages/editor/build-module/components/post-publish-panel/toggle?source=node_modules';

const { PostPublishPanelToggle } = others;


export default compose( [
	withSelect( ( select ) => {
		const {
			isSavingPost,
			isEditedPostSaveable,
			isEditedPostPublishable,
			isCurrentPostPending,
			isCurrentPostPublished,
			isEditedPostBeingScheduled,
			isCurrentPostScheduled,
			getCurrentPost,
      getCurrentPostType,
      getEditorSettings, // GUTENBERG JS
    } = select( 'core/editor' );

    // GUTENBERG JS
    const { canPublish } = getEditorSettings();

		return {
			hasPublishAction: get( getCurrentPost(), [ '_links', 'wp:action-publish' ], false ),
			isSaving: isSavingPost(),
			isSaveable: isEditedPostSaveable(),
			isPublishable: isEditedPostPublishable(),
			isPending: isCurrentPostPending(),
			isPublished: isCurrentPostPublished(),
			isScheduled: isCurrentPostScheduled(),
			isBeingScheduled: isEditedPostBeingScheduled(),
      postType: getCurrentPostType(),
      // GUTENBERG JS
      canPublish,
		};
  } ),
  // GUTENBERG JS
  // added ifCondition to enable/disable
  // the publish button according 'canPublish' setting
  ifCondition(({ canPublish }) => canPublish),
] )( PostPublishPanelToggle );

export * from 'gutenberg/packages/editor/build-module/components/post-publish-panel/toggle?source=node_modules';
