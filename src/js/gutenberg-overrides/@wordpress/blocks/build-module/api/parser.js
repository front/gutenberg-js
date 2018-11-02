/**
 * External dependencies
 */
import { get, kebabCase, map, mapKeys, castArray } from 'lodash';
import jQuery from 'jquery';

import def, * as others from '@wordpress/blocks/build-module/api/parser?source=node_modules';

const { parseWithAttributeSchema, isOfTypes } = others;

/**
 * [parseDataAttributes description]
 * @param  {[type]} innerHTML       [description]
 * @param  {[type]} attributeSchema [description]
 * @param  {[type]} value           [description]
 * @return {[type]}                 [description]
 */
function parseDataAttributes (innerHTML, attributeSchema, value) {
  const data = get(attributeSchema.query, [ 'data' ]);

  const schema = {
    source: attributeSchema.source,
    selector: attributeSchema.selector,
    query: {
      elements: {
        source: 'html',
        selector: data.parent,
      },
    },
  };

  // getting elements html
  const elements = parseWithAttributeSchema(innerHTML, schema);

  value = map(value, (attrs, k) => {
    // using jQuery to get data attrs easily
    const dataAttrs = jQuery(elements[ k ].elements).data();

    attrs.data = mapKeys(dataAttrs, (v, key) => {
      // adding data suffix and changing from camelCase to dash
      return `data-${kebabCase(key)}`;
    });

    return attrs;
  });

  return value;
}

others.getBlockAttribute = (attributeKey, attributeSchema, innerHTML, commentAttributes) => {
  const { type } = attributeSchema;
  let value, data;

  switch (attributeSchema.source) {
    // undefined source means that it's an attribute serialized to the block's "comment"
    case undefined:
      value = commentAttributes ? commentAttributes[ attributeKey ] : undefined;
      break;
    case 'attribute':
    case 'property':
    case 'html':
    case 'text':
    case 'children':
    case 'node':
    case 'query':
    case 'tag':
      value = parseWithAttributeSchema(innerHTML, attributeSchema);

      // checks 'data' property
      data = get(attributeSchema.query, [ 'data' ]);

      if (data && data.type === 'object') {
        value = parseDataAttributes(innerHTML, attributeSchema, value);
      }

      break;
  }

  if (type !== undefined && ! isOfTypes(value, castArray(type))) {
    // Reject the value if it is not valid of type. Reverting to the
    // undefined value ensures the default is restored, if applicable.
    value = undefined;
  }

  if (value === undefined) {
    return attributeSchema.default;
  }

  return value;
};

export default def;
export * from '@wordpress/blocks/build-module/api/parser?source=node_modules';
