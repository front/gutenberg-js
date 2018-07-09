/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { defaultColumnsNumber } from 'gutenberg/core-blocks/gallery/edit';

import * as others from 'gutenberg/core-blocks/gallery?source=node_modules';

// added data attributes (which is an object)
others.settings.attributes.images.data = {
	source: 'attribute',
	selector: 'img',
	parent: 'figure',
	type: 'object',
	default: {},
};

// overrired save function to render image data attributes
others.settings.save = ( { attributes } ) => {
	const { images, columns = defaultColumnsNumber( attributes ), align, imageCrop, linkTo } = attributes;
	return (
		<ul className={ `align${ align } columns-${ columns } ${ imageCrop ? 'is-cropped' : '' }` } >
			{ images.map( ( image ) => {
				let href;

				switch ( linkTo ) {
					case 'media':
						href = image.url;
					break;
					case 'attachment':
						href = image.link;
					break;
				}

				const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } { ...image.data } />;

				return (
					<li key={ image.id || image.url } className="blocks-gallery-item">
						<figure>
							{ href ? <a href={ href }>{ img }</a> : img }
							{ image.caption && image.caption.length > 0 && (
								<RichText.Content tagName="figcaption" value={ image.caption } />
							) }
						</figure>
					</li>
				);
			} ) }
		</ul>
	);
};

export * from 'gutenberg/core-blocks/gallery?source=node_modules';
