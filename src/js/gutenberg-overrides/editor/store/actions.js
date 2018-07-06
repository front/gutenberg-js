/**
 * WordPress dependencies
 */
import {
  getDefaultBlockName,
  createBlock,
} from '@wordpress/blocks';

import * as paragraph from 'gutenberg/core-blocks/paragraph';

import def, * as others from 'gutenberg/editor/store/actions?source=node_modules';

const { insertBlock } = others;

// Override 'insertDefaultBlock' action in order to to could set 
// Section as dafault block
others.insertDefaultBlock = (attributes, rootUID, index) => {
  const blockName = rootUID === undefined ? getDefaultBlockName() : paragraph.name;
  const block = createBlock(blockName, attributes);

  return {
    ...insertBlock(block, index, rootUID),
    isProvisional: blockName === paragraph.name,
  };
};

export default def;
export * from 'gutenberg/editor/store/actions?source=node_modules';
