import { get } from 'lodash';

import { ifCondition } from '@wordpress/components';
import { compose } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

import * as others from 'gutenberg/editor/components/post-publish-panel/toggle.js?source=node_modules';

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
			getEditorSettings,
		} = select( 'core/editor' );

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
			canPublish,
		};
	} ),
	// added ifCondition to enable/disable 
	// the publish button according 'canPublish' setting
	ifCondition( ( { canPublish } ) => canPublish ),
] )( others.PostPublishPanelToggle );

export * from 'gutenberg/editor/components/post-publish-panel/toggle.js?source=node_modules';
