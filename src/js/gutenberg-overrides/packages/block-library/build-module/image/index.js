/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/editor';

import * as others from 'gutenberg/packages/block-library/build-module/image/index?source=node_modules';

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

  const figure = (
    <Fragment>
      { href ? <a href={ href }>{ image }</a> : image }
      { caption && caption.length > 0 && <RichText.Content tagName="figcaption" value={ caption } /> }
    </Fragment>
  );

  if ('left' === align || 'right' === align || 'center' === align) {
    return (
      <div>
        <figure className={ classes }>
          { figure }
        </figure>
      </div>
    );
  }

  return (
    <figure className={ classes }>
      { figure }
    </figure>
  );
};

export * from 'gutenberg/packages/block-library/build-module/image/index?source=node_modules';
