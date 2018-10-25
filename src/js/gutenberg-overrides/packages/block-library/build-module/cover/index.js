/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
  BlockControls,
  InspectorControls,
  BlockAlignmentToolbar,
  MediaPlaceholder,
  MediaUpload,
  AlignmentToolbar,
  PanelColorSettings,
  RichText,
  withColors,
  getColorClassName,
} from '@wordpress/editor';

import * as others from 'gutenberg/packages/block-library/build-module/cover/index?source=node_modules';

function dimRatioToClass (ratio) {
  return (ratio === 0 || ratio === 50) ?
    null :
    'has-background-dim-' + (10 * Math.round(ratio / 10));
}

function backgroundImageStyles (url) {
  return url ?
    { backgroundImage: `url(${url})` } :
    {};
}

const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];
const IMAGE_BACKGROUND_TYPE = 'image';
const VIDEO_BACKGROUND_TYPE = 'video';

// added data attributes (which is an object)
others.settings.attributes.data = {
  type: 'object',
  default: {},
};

// overrired edit function to add data attributes
others.settings.edit = compose([
  withColors({ overlayColor: 'background-color' }),
  withNotices,
])(
  ({ attributes, setAttributes, isSelected, className, noticeOperations, noticeUI, overlayColor, setOverlayColor }) => {
    const {
      align,
      backgroundType,
      contentAlign,
      dimRatio,
      hasParallax,
      id,
      title,
      url,
      data, // GUTENBERG-JS
    } = attributes;
    const updateAlignment = nextAlign => setAttributes({ align: nextAlign });
    const onSelectMedia = media => {
      if (! media || ! media.url) {
        setAttributes({ url: undefined, id: undefined });
        return;
      }
      let mediaType;
      // for media selections originated from a file upload.
      if (media.media_type) {
        if (media.media_type === IMAGE_BACKGROUND_TYPE) {
          mediaType = IMAGE_BACKGROUND_TYPE;
        }
        else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // Videos contain the media type of 'file' in the object returned from the rest api.
          mediaType = VIDEO_BACKGROUND_TYPE;
        }
      }
      else { // for media selections originated from existing files in the media library.
        if (
          media.type !== IMAGE_BACKGROUND_TYPE &&
          media.type !== VIDEO_BACKGROUND_TYPE
        ) {
          return;
        }
        mediaType = media.type;
      }

      // GUTENBERG-JS
      const toUpdate = {
        url: media.url,
        id: media.id,
        backgroundType: mediaType,
      };

      if (media.data) {
        toUpdate.data = Object.keys(media.data)
        .reduce((result, key) => {
          result[`data-${key.replace('_', '-')}`] = media.data[key];

          return result;
        }, {});
      }

      setAttributes(toUpdate);
    };
    const toggleParallax = () => setAttributes({ hasParallax: ! hasParallax });
    const setDimRatio = ratio => setAttributes({ dimRatio: ratio });
    const setTitle = newTitle => setAttributes({ title: newTitle });

    const style = {
      ...(
        backgroundType === IMAGE_BACKGROUND_TYPE ?
          backgroundImageStyles(url) :
          {}
      ),
      backgroundColor: overlayColor.color,
    };

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
          { !! url && (
            <Fragment>
              <AlignmentToolbar
                value={ contentAlign }
                onChange={ nextAlign => {
                  setAttributes({ contentAlign: nextAlign });
                } }
              />
              <Toolbar>
                <MediaUpload
                  onSelect={ onSelectMedia }
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  value={ id }
                  render={ ({ open }) => (
                    <IconButton
                      className="components-toolbar__control"
                      label={ __('Edit media') }
                      icon="edit"
                      onClick={ open }
                    />
                  ) }
                />
              </Toolbar>
            </Fragment>
          ) }
        </BlockControls>
        { !! url && (
          <InspectorControls>
            <PanelBody title={ __('Cover Settings') }>
              { IMAGE_BACKGROUND_TYPE === backgroundType && (
                <ToggleControl
                  label={ __('Fixed Background') }
                  checked={ hasParallax }
                  onChange={ toggleParallax }
                />
              ) }
              <PanelColorSettings
                title={ __('Overlay') }
                initialOpen={ true }
                colorSettings={ [ {
                  value: overlayColor.color,
                  onChange: setOverlayColor,
                  label: __('Overlay Color'),
                } ] }
              >
                <RangeControl
                  label={ __('Background Opacity') }
                  value={ dimRatio }
                  onChange={ setDimRatio }
                  min={ 0 }
                  max={ 100 }
                  step={ 10 }
                />
              </PanelColorSettings>
            </PanelBody>
          </InspectorControls>
        ) }
      </Fragment>
    );

    if (! url) {
      const hasTitle = ! RichText.isEmpty(title);
      const icon = hasTitle ? undefined : 'format-image';
      const label = hasTitle ? (
        <RichText
          tagName="h2"
          value={ title }
          onChange={ setTitle }
          inlineToolbar
        />
      ) : __('Cover');

      return (
        <Fragment>
          { controls }
          <MediaPlaceholder
            icon={ icon }
            className={ className }
            labels={ {
              title: label,
              /* translators: Fragment of the sentence: "Drag %s, upload a new one or select a file from your library." */
              name: __('an image or a video'),
            } }
            onSelect={ onSelectMedia }
            accept="image/*,video/*"
            allowedTypes={ ALLOWED_MEDIA_TYPES }
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
          { VIDEO_BACKGROUND_TYPE === backgroundType && (
            <video
              className="wp-block-cover__video-background"
              autoPlay
              muted
              loop
              src={ url }
            />
          ) }
          { (! RichText.isEmpty(title) || isSelected) && (
            <RichText
              tagName="p"
              className="wp-block-cover-text"
              placeholder={ __('Write title…') }
              value={ title }
              onChange={ setTitle }
              inlineToolbar
            />
          ) }
        </div>
      </Fragment>
    );
  }
);

// overrired save function to add data attributes
others.settings.save = ({ attributes, className }) => {
  const {
    align,
    backgroundType,
    contentAlign,
    customOverlayColor,
    dimRatio,
    hasParallax,
    overlayColor,
    title,
    url,
    data,
  } = attributes;
  const overlayColorClass = getColorClassName('background-color', overlayColor);
  const style = backgroundType === IMAGE_BACKGROUND_TYPE ?
    backgroundImageStyles(url) :
    {};
  if (! overlayColorClass) {
    style.backgroundColor = customOverlayColor;
  }

  const classes = classnames(
    className,
    dimRatioToClass(dimRatio),
    overlayColorClass,
    {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax,
      [ `has-${contentAlign}-content` ]: contentAlign !== 'center',
    },
    align ? `align${align}` : null,
  );

  return (
    <div className={ classes } style={ style } { ...data }>
      { VIDEO_BACKGROUND_TYPE === backgroundType && url && (<video
        className="wp-block-cover__video-background"
        autoPlay
        muted
        loop
        src={ url }
      />) }
      { ! RichText.isEmpty(title) && (
        <RichText.Content tagName="p" className="wp-block-cover-text" value={ title } />
      ) }
    </div>

  );
};

export * from 'gutenberg/packages/block-library/build-module/cover/index?source=node_modules';
