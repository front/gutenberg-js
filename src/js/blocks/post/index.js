/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClass, RichText } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import * as controls from './controls';

import './style.scss';

const {
  dimRatioToClass,
  backgroundImageStyles,
} = controls;

const blockAttributes = {
  id: { // post.id
    type: 'number',
  },
  title: { // post.title
    type: 'array',
    source: 'children',
    selector: 'h1,h2,h3,h4,h5,h6',
  },
  link: {	// post.link
    type: 'string',
  },
  imageId: { // post media.id
    type: 'number',
  },
  imageUrl: { // post media.url
    type: 'string',
  },
  categoryId: {
    type: 'number',
  },
  authorId: {
    type: 'number',
  },
  hasImage: {
    type: 'boolean',
    default: true,
  },
  hasParallax: {
    type: 'boolean',
    default: false,
  },
  dimRatio: {
    type: 'number',
    default: 0,
  },
  textColor: {
    type: 'string',
  },
  customTextColor: {
    type: 'string',
  },
  fontSize: {
    type: 'string',
    default: 'large',
  },
  customFontSize: {
    type: 'number',
  },
  data: {
    type: 'object',
    default: {},
  },
  type: {
    type: 'string',
    default: 'static',
  },
};

export const name = 'gutenbergjs/post';

export const settings = {
  title: __('Post'),

  description: __('Post has an image and a title.'),

  icon: 'universal-access-alt',

  category: 'gutenbergjs',

  attributes: blockAttributes,

  edit,

  save ({ attributes, className }) {
    const {
      title,
      link,
      imageUrl,
      hasImage,
      hasParallax,
      dimRatio,
      textColor,
      customTextColor,
      fontSize,
      customFontSize,
      data,
    } = attributes;

    // Image
    const imageStyle = backgroundImageStyles(imageUrl);
    const imageClasses = classnames(
      'wp-block-cover-image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
      },
    );

    // Title
    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const textClasses = classnames({
      [ fontSizeClass ]: fontSizeClass,
      [ textClass ]: textClass,
    });

    const textStyle = {
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };

    const post = (
      <div className={ className }>
        { hasImage &&
        <div
          className={ imageClasses }
          style={ imageStyle }
          { ...data }
        ></div>
        }
        <RichText.Content
          tagName="h1"
          style={ textStyle }
          className={ textClasses ? textClasses : undefined }
          value={ title }
        />
      </div>
    );

    return (link ? <a href={ link }>{ post }</a> : post);
  },

  draggablePost: true,
};

export { controls };
