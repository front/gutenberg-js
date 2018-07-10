/**
 * External dependencies
 */
import React from 'react';
import { get, isUndefined, pickBy } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { withAPIData } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import PostsList from './posts-list';

function PostsSearch ({ postsList }) {
  return (<PostsList posts={ get(postsList, [ 'data' ], {}) } />);
}

export default withAPIData(({ options }) => {
  const postsListQuery = stringify(pickBy({
    category_id: options.categoryId || '',
    search: options.term || '',
    order: options.order || 'desc',
    orderby: options.orderBy || 'date',
    per_page: 10,
    // datetime: Date.now(), // make postsList is always updated
  }, value => ! isUndefined(value)));

  return {
    postsList: `/wp/v2/posts?${postsListQuery}`,
  };
})(PostsSearch);
