/**
 * External dependencies
 */
import { get } from 'lodash';
import def from 'gutenberg/editor/store/effects?source=node_modules';

const removeBocks = def.REMOVE_BLOCKS;

def.REMOVE_BLOCKS = ( action, store ) => {
	if ( get( window, [ 'customGutenberg', 'events', 'REMOVE_BLOCKS' ] ) ) {
		window.customGutenberg.events.REMOVE_BLOCKS( action, store );
	}

	removeBocks( action, store );
}; 

export default def;
export * from 'gutenberg/editor/store/effects?source=node_modules';
