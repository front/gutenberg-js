/**
 * WordPress dependencies
 */
import {
  getDefaultBlockName,
  createBlock,
} from '@wordpress/blocks';

import * as others from 'gutenberg/packages/editor/build-module/store/actions?source=node_modules';

const { insertBlock } = others;

// Override 'insertDefaultBlock' action in order to to could set
// Section as dafault block
others.insertDefaultBlock = (attributes, rootUID, index) => {
  const blockName = rootUID === undefined ? getDefaultBlockName() : 'core/paragraph';
  const block = createBlock(blockName, attributes);

  return {
    ...insertBlock(block, index, rootUID),
    isProvisional: blockName === 'core/paragraph',
  };
};

export * from 'gutenberg/packages/editor/build-module/store/actions?source=node_modules';
