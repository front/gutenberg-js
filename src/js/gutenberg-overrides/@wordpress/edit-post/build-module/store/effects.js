/**
 * External dependencies
 */
import { get } from 'lodash';
import def from '@wordpress/edit-post/build-module/store/effects?source=node_modules';

def.OPEN_GENERAL_SIDEBAR = ( action, store ) => {
	if ( get( window, [ 'customGutenberg', 'events', 'OPEN_GENERAL_SIDEBAR' ] ) ) {
		window.customGutenberg.events.OPEN_GENERAL_SIDEBAR( action, store );
	}
};

def.CLOSE_GENERAL_SIDEBAR = ( action, store ) => {
	if ( get( window, [ 'customGutenberg', 'events', 'CLOSE_GENERAL_SIDEBAR' ] ) ) {
		window.customGutenberg.events.CLOSE_GENERAL_SIDEBAR( action, store );
	}
};

export default def;
export * from '@wordpress/edit-post/build-module/store/effects?source=node_modules';
