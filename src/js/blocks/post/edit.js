/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { isUndefined, pickBy } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  Component,
  Fragment,
  compose,
} from '@wordpress/element';
import {
  Toolbar,
  withFallbackStyles,
  withAPIData,
} from '@wordpress/components';
import {
  withColors,
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  RichText,
} from '@wordpress/editor';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
  ImageSettingsPanel,
  MediaUploadToolbar,
  PostSettingsPanel,
  TextColorPanel,
  TextSettingsPanel,
  getFontSize,
  onSelectImage,
  dimRatioToClass,
  backgroundImageStyles,
  withSelectMedia,
} from './controls';
import './editor.scss';

const { getComputedStyle } = window;

class PostEdit extends Component {
  componentDidUpdate (prevProps) {
    const { post, media, postResults, setAttributes } = this.props;
    const { type } = this.props.attributes;

    const attributes = {};

    if (type === 'withid' && post && post !== prevProps.post) {
      attributes.title = [ post.title.rendered ];
      attributes.link = post.link;
      attributes.imageId = post.featured_media;
    }

    if (type === 'auto' && postResults && postResults !== prevProps.postResults && postResults.data) {
      const postRes = postResults.data[ 0 ];

      attributes.id = parseInt(postRes.id);
      attributes.title = [ postRes.title.rendered ];
      attributes.link = postRes.link;
      attributes.imageId = postRes.featured_media;
    }

    if (media && media !== prevProps.media) {
      attributes.imageUrl = media.source_url;
    }

    if (attributes) {
      setAttributes(attributes);
    }
  }

  render () {
    const {
      attributes,
      setAttributes,
      className,
      textColor,
    } = this.props;

    const {
      title,
      imageUrl,
      hasImage,
      hasParallax,
      dimRatio,
      placeholder,
    } = attributes;

    const imageStyle = backgroundImageStyles(imageUrl);
    const imageClasses = classnames(
      'wp-block-cover-image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
      }
    );

    const fontSize = getFontSize(attributes);

    const controls = (
      <Fragment>
        <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls>
        <InspectorControls>
          <PostSettingsPanel props={ this.props } />
          <ImageSettingsPanel props={ this.props } />
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />
        </InspectorControls>
      </Fragment>
    );

    const richText = (
      <RichText
        tagName="p"
        className={ classnames('wp-block-paragraph', {
          [ textColor.class ]: textColor.class,
        }) }
        style={ {
          color: textColor.class ? undefined : textColor.value,
          fontSize: fontSize ? fontSize + 'px' : undefined,
        } }
        value={ title }
        onChange={ value => {
          setAttributes({
            title: value,
            type: 'static',
          });
        } }
        placeholder={ placeholder || __('Add text or type') }
        formattingControls={ [ 'bold', 'italic' ] }
        inlineToolbar
      />
    );

    if (! imageUrl) {
      return (
        <div className={ className }>
          { controls }
          { hasImage &&
            <MediaPlaceholder
              icon="format-image"
              labels={ {
                title: __('Post image'),
                name: __('an image'),
              } }
              onSelect={ media => onSelectImage(this.props, media) }
              accept="image/*"
              type="image"
            />
          }
          { richText }
        </div>
      );
    }

    return (
      <div className={ className }>
        { controls }
        { hasImage &&
        <div
          data-url={ imageUrl }
          style={ imageStyle }
          className={ imageClasses }
        ></div>
        }
        { richText }
      </div>
    );
  }
}

export default compose(
  withSelect((select, props) => {
    const { getCategories, getEntityRecord } = select('core');
    const { attributes } = props;

    const res = {};

    switch (attributes.type) {
      case 'auto':
        res.categories = getCategories();
        break;
      case 'withid':
        if (attributes.id && attributes.id !== '') {
          res.post = getEntityRecord('postType', 'post', attributes.id);

          if (res.post) {
            attributes.imageId = res.post.featured_media;
          }
        }
        break;
    }

    return {
      ...res,
      ...withSelectMedia(select, props),
    };
  }),
  withColors({ textColor: 'color' }),
  withFallbackStyles((node, ownProps) => {
    const { fontSize, customFontSize } = ownProps.attributes;
    const editableNode = node.querySelector('[contenteditable="true"]');
    // verify if editableNode is available, before using getComputedStyle.
    const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
    return {
      fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined,
    };
  }),
  withAPIData(props => {
    if (props.attributes.type === 'auto') {
      const postQuery = stringify(pickBy({
        category_id: props.attributes.categoryId,
        order: 'desc',
        orderby: 'date',
        per_page: 1,
      }, value => ! isUndefined(value)));

      return {
        postResults: `/wp/v2/posts?${postQuery}`,
      };
    }

    return {
      postResults: null,
    };
  }),
)(PostEdit);
