/**
 * External dependencies
 */
import React from 'react';
import { isEmpty, reduce } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
  BlockControls,
  InspectorControls,
  BlockAlignmentToolbar,
  MediaPlaceholder,
  MediaUpload,
  AlignmentToolbar,
  RichText,
} from '@wordpress/editor';

import * as others from 'gutenberg/core-blocks/cover-image?source=node_modules';

// required local functions
function dimRatioToClass (ratio) {
  return (ratio === 0 || ratio === 50) ?
    null :
    'has-background-dim-' + (10 * Math.round(ratio / 10));
}

function backgroundImageStyles (url) {
  return url ?
    { backgroundImage: `url(${url})` } :
    undefined;
}

// added data attributes (which is an object)
others.settings.attributes.data = {
  type: 'object',
  default: {},
};

// overrired edit function to add data attributes
others.settings.edit = withNotices(({ attributes, setAttributes, isSelected, className, noticeOperations, noticeUI }) => {
  const { url, title, align, contentAlign, id, hasParallax, dimRatio, data } = attributes;
  const updateAlignment = nextAlign => setAttributes({ align: nextAlign });
  const onSelectImage = media => {
    if (! media || ! media.url) {
      setAttributes({ url: undefined, id: undefined });
      return;
    }

    const toUpdate = { url: media.url, id: media.id };

    if (media.data) {
      toUpdate.data = reduce(media.data, (result, value, key) => {
        key = key.replace('_', '-');
        result[ `data-${key}` ] = value;

        return result;
      }, {});
    }

    setAttributes(toUpdate);
  };
  const toggleParallax = () => setAttributes({ hasParallax: ! hasParallax });
  const setDimRatio = ratio => setAttributes({ dimRatio: ratio });

  const style = backgroundImageStyles(url);
  const classes = classnames(
    className,
    contentAlign !== 'center' && `has-${contentAlign}-content`,
    dimRatioToClass(dimRatio),
    {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax,
    }
  );

  const controls = (
    <Fragment>
      <BlockControls>
        <BlockAlignmentToolbar
          value={ align }
          onChange={ updateAlignment }
        />
        <AlignmentToolbar
          value={ contentAlign }
          onChange={ nextAlign => {
            setAttributes({ contentAlign: nextAlign });
          } }
        />
        <Toolbar>
          <MediaUpload
            onSelect={ onSelectImage }
            type="image"
            value={ id }
            render={ ({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={ __('Edit image') }
                icon="edit"
                onClick={ open }
              />
            ) }
          />
        </Toolbar>
      </BlockControls>
      { !! url && (
        <InspectorControls>
          <PanelBody title={ __('Cover Image Settings') }>
            <ToggleControl
              label={ __('Fixed Background') }
              checked={ !! hasParallax }
              onChange={ toggleParallax }
            />
            <RangeControl
              label={ __('Background Dimness') }
              value={ dimRatio }
              onChange={ setDimRatio }
              min={ 0 }
              max={ 100 }
              step={ 10 }
            />
          </PanelBody>
        </InspectorControls>
      ) }
    </Fragment>
  );

  if (! url) {
    const hasTitle = ! isEmpty(title);
    const icon = hasTitle ? undefined : 'format-image';
    const label = hasTitle ? (
      <RichText
        tagName="h2"
        value={ title }
        onChange={ value => setAttributes({ title: value }) }
        inlineToolbar
      />
    ) : __('Cover Image');

    return (
      <Fragment>
        { controls }
        <MediaPlaceholder
          icon={ icon }
          className={ className }
          labels={ {
            title: label,
            name: __('an image'),
          } }
          onSelect={ onSelectImage }
          accept="image/*"
          type="image"
          notices={ noticeUI }
          onError={ noticeOperations.createErrorNotice }
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      { controls }
      <div
        data-url={ url }
        style={ style }
        className={ classes }
        { ...data }
      >
        { title || isSelected ? (
          <RichText
            tagName="p"
            className="wp-block-cover-image-text"
            placeholder={ __('Write title…') }
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
            inlineToolbar
          />
        ) : null }
      </div>
    </Fragment>
  );
});

// overrired save function to add data attributes
others.settings.save = ({ attributes, className }) => {
  const { url, title, hasParallax, dimRatio, align, contentAlign, data } = attributes;
  const style = backgroundImageStyles(url);
  const classes = classnames(
    className,
    dimRatioToClass(dimRatio),
    {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax,
      [ `has-${contentAlign}-content` ]: contentAlign !== 'center',
    },
    align ? `align${align}` : null,
  );

  return (
    <div className={ classes } style={ style } { ...data }>
      { title && title.length > 0 && (
        <RichText.Content tagName="p" className="wp-block-cover-image-text" value={ title } />
      ) }
    </div>
  );
};

export * from 'gutenberg/core-blocks/cover-image?source=node_modules';
