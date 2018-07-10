/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';

import * as post from './post';
import * as row from './row';
import * as section from './section';

const category = {
  slug: 'gutenbergjs',
  title: __('Gutenberg-js blocks'),
};

const currentCategories = filter(select('core/blocks').getCategories(), ({ slug }) => (slug !== category.slug));

const categories = [
  category,
  ...currentCategories,
];

dispatch('core/blocks').setCategories(categories);

export {
  post,
  row,
  section,
};
