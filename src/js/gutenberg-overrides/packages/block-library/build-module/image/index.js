/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';

import { RichText } from '@wordpress/editor';

import * as others from 'gutenberg/packages/block-library/build-module/image?source=node_modules';

// added data attributes (which is an object)
others.settings.attributes.data = {
  type: 'object',
  default: {},
};

// overrired save function to render image data attributes
others.settings.save = ({ attributes }) => {
  const { url, alt, caption, align, href, width, height, id, data } = attributes;

  const classes = classnames({
    [ `align${align}` ]: align,
    'is-resized': width || height,
  });

  const image = (
    <img
      src={ url }
      alt={ alt }
      className={ id ? `wp-image-${id}` : null }
      width={ width }
      height={ height }
      { ...data }
    />
  );

  return (
    <figure className={ classes }>
      { href ? <a href={ href }>{ image }</a> : image }
      { caption && caption.length > 0 && <RichText.Content tagName="figcaption" value={ caption } /> }
    </figure>
  );
};

export * from 'gutenberg/packages/block-library/build-module/image?source=node_modules';
