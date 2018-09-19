/**
 * WordPress dependencies
 */
import {
  getDefaultBlockName,
  createBlock,
} from '@wordpress/blocks';

import * as others from 'gutenberg/packages/editor/build-module/store/actions?source=node_modules';

const { insertBlock } = others;

// Override 'insertDefaultBlock' action in order to could set
// Section as default block
others.insertDefaultBlock = (attributes, rootClientId, index) => {
  const blockName = rootClientId === undefined ? getDefaultBlockName() : 'core/paragraph';
  const block = createBlock(blockName, attributes);

  return {
    ...insertBlock(block, index, rootClientId),
    isProvisional: blockName === 'core/paragraph',
  };
};

export * from 'gutenberg/packages/editor/build-module/store/actions?source=node_modules';
