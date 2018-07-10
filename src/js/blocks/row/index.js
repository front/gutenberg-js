/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import './style.scss';

export const name = 'gutenbergjs/row';

export const settings = {
  title: __('Row'),

  icon: 'columns',

  category: 'gutenbergjs',

  attributes: {
    columns: {
      type: 'number',
      default: 2,
    },
    widths: {
      type: 'string',
      default: '6,6',
    },
  },

  description: __('Add a block that displays content in multiple columns, then add whatever content blocks you\'d like.'),

  edit,

  save ({ className }) {
    return (
      <div className={ className }>
        <InnerBlocks.Content />
      </div>
    );
  },
};
