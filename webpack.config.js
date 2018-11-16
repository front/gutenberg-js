/**
 * External dependencies
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { resolve } = require('path');

const extractCSS = new ExtractTextPlugin('./css/style.css');
const extractBLCSS = new ExtractTextPlugin('./css/block-library/style.css');

// const PostCssWrapper = require('postcss-wrapper-loader');
// const StringReplacePlugin = require('string-replace-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Given a string, returns a new string with dash separators converedd to
 * camel-case equivalent. This is not as aggressive as `_.camelCase` in
 * converting to uppercase, where Lodash will convert letters following
 * numbers.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
function camelCaseDash (string) {
  return string.replace(
    /-([a-z])/g,
    (match, letter) => letter.toUpperCase()
  );
}

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  moment: 'moment',
  lodash: 'lodash',
  'lodash-es': 'lodash',
};

const alias = {};

[
  'api-fetch',
  'url',
].forEach(name => {
  externals[ `@wordpress/${name}` ] = {
    this: [ 'wp', camelCaseDash(name) ],
  };
});

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  entry: './src/js/index.js',
  output: {
    filename: 'js/gutenberg-js.js',
    path: resolve(__dirname, 'build'),
    libraryTarget: 'this',
  },
  externals,
  resolve: {
    modules: [
      __dirname,
      resolve(__dirname, 'node_modules'),
    ],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          /src/,
          /node_modules\/@wordpress/,
        ],
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        oneOf: [
          {
            resourceQuery: /\?source=node_modules/,
            use: 'babel-loader',
          },
          {
            loader: 'path-replace-loader',
            options: {
              path: resolve(__dirname, 'node_modules/@wordpress'),
              replacePath: resolve(__dirname, 'src/js/gutenberg-overrides/@wordpress'),
            },
          },
        ],
      },
      /* {
        test: /editor\.s?css$/,
        include: [
          /block-library/,
        ],
        use: mainCSSExtractTextPlugin.extract({
          use: [
            {
              // removing .gutenberg class in editor.scss files
              loader: StringReplacePlugin.replace({
                replacements: [ {
                  pattern: /.gutenberg /ig,
                  // replacement: () => (''),
                  replacement: () => ('.gutenberg__editor'),
                } ],
              }),
            },
            ...extractConfig.use,
          ],
        }),
      },*/
      {
        test: /style\.s?css$/,
        use: extractCSS.extract({
          fallback: 'style-loader', // creates style nodes from JS strings
          use: [
            { loader: 'css-loader' },   // translates CSS into CommonJS
            { loader: 'sass-loader' },  // compiles Sass to CSS
          ],
        }),
      },
      {
        test: /block-library\.s?css$/,
        use: extractBLCSS.extract({
          fallback: 'style-loader', // creates style nodes from JS strings
          use: [
            { loader: 'css-loader' },   // translates CSS into CommonJS
            { loader: 'sass-loader' },  // compiles Sass to CSS
          ],
        }),
      },
    ],
  },
  plugins: [
    extractCSS,
    extractBLCSS,
    // wrapping editor style with .gutenberg__editor class
    // new PostCssWrapper('./css/block-library/edit-blocks.css', '.gutenberg__editor'),
    // new StringReplacePlugin(),
    new CleanWebpackPlugin(['build']),
  ],
  stats: {
    children: false,
  },
};
