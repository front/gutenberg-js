/**
 * External dependencies
 */
import { get, kebabCase, map, mapKeys } from 'lodash';
import jQuery from 'jquery';

import def, * as others from 'gutenberg/blocks/api/parser?source=node_modules';

const { asType, parseWithAttributeSchema } = others;

/**
 * [parseDataAttributes description]
 * @param  {[type]} innerHTML       [description]
 * @param  {[type]} attributeSchema [description]
 * @param  {[type]} value           [description]
 * @return {[type]}                 [description]
 */
function parseDataAttributes (innerHTML, attributeSchema, value) {
  const data = get(attributeSchema.query, [ 'data' ]);

  // getting elements html
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

  const elements = parseWithAttributeSchema(innerHTML, schema);

  value = map(value, (attrs, k) => {
    // using jQuery to get data attrs easylly
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
      value = parseWithAttributeSchema(innerHTML, attributeSchema);

      data = get(attributeSchema.query, [ 'data' ]);

      if (data && data.type === 'object') {
        value = parseDataAttributes(innerHTML, attributeSchema, value);
      }

      break;
  }

  return value === undefined ? attributeSchema.default : asType(value, attributeSchema.type);
};

export default def;
export * from 'gutenberg/blocks/api/parser?source=node_modules';
