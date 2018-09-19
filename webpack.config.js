/**
 * External dependencies
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcss = require('postcss');

const { get } = require('lodash');
const { basename, resolve } = require('path');

/**
 * Gutenberg-js dependencies
 */
const PostCssWrapper = require('postcss-wrapper-loader');
const StringReplacePlugin = require('string-replace-webpack-plugin');

/**
 * WordPress dependencies
 */
const CustomTemplatedPathPlugin = require('./node_modules/gutenberg/packages/custom-templated-path-webpack-plugin');
const LibraryExportDefaultPlugin = require('./node_modules/gutenberg/packages/library-export-default-webpack-plugin');

// Main CSS loader for everything but blocks..
const mainCSSExtractTextPlugin = new ExtractTextPlugin({
  filename: './css/style.css',
});

// CSS loader for styles specific to block editing.
const editBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/block-library/edit-blocks.css',
});

// CSS loader for styles specific to blocks in general.
const blocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/block-library/style.css',
});

// CSS loader for default visual block styles.
const themeBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/block-library/theme.css',
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: require('./node_modules/gutenberg/bin/packages/post-css-config'),
      },
    },
    {
      loader: 'sass-loader',
      query: {
        includePaths: [ './node_modules/gutenberg/edit-post/assets/stylesheets' ],
        data: '@import "colors"; @import "breakpoints"; @import "variables"; @import "mixins"; @import "animations"; @import "z-index";',
        outputStyle: 'production' === process.env.NODE_ENV ?
          'compressed' : 'nested',
      },
    },
  ],
};

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

const entryPointNames = [
  'components',
  'edit-post',
  'block-library',
];

const gutenbergPackages = [
  'a11y',
  'autop',
  'blob',
  'blocks',
  'block-library', // keep it here to overrides
  'block-serialization-default-parser',
  'block-serialization-spec-parser',
  'browserslist-config',
  'compose',
  'core-data',
  'data',
  'date',
  'deprecated',
  'dom',
  'dom-ready',
  'editor',
  'element',
  'hooks',
  'html-entities',
  'i18n',
  'is-shallow-equal',
  'keycodes',
  'list-reusable-blocks',
  'nux',
  'plugins',
  'redux-routine',
  'shortcode',
  'token-list',
  'viewport',
  'wordcount',
];

const coreGlobals = [
  'api-fetch',
  'url',
];

const externals = {};

const alias = {};

entryPointNames.forEach(name => {
  alias[ `@wordpress/${name}` ] = resolve(__dirname, 'node_modules/gutenberg', name);
});

gutenbergPackages.forEach(name => {
  alias[ `@wordpress/${name}` ] = resolve(__dirname, 'node_modules/gutenberg/packages', name);
});

[
  ...coreGlobals,
].forEach(name => {
  externals[ `@wordpress/${name}` ] = {
    this: [ 'wp', camelCaseDash(name) ],
  };
});

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: './src/js/index.js',
  output: {
    filename: 'js/gutenberg-js.js',
    path: resolve(__dirname, 'build'),
    libraryTarget: 'this',
  },
  externals,
  resolve: {
    modules: [
      resolve(__dirname, 'node_modules/gutenberg/node_modules'),
      __dirname,
      'node_modules',
    ],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules\/(?!(gutenberg)\/).*/,
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
              path: resolve(__dirname, 'node_modules/gutenberg'),
              replacePath: resolve(__dirname, 'src/js/gutenberg-overrides'),
            },
          },
        ],
      },
      {
        test: /style\.s?css$/,
        include: [
          /block-library/,
        ],
        use: blocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /editor\.s?css$/,
        include: [
          /block-library/,
        ],
        use: editBlocksCSSPlugin.extract({
          use: [
            ...extractConfig.use,
            {
              // remove .gutenberg class in editor.scss files
              loader: StringReplacePlugin.replace({
                replacements: [ {
                  pattern: /.gutenberg /ig,
                  replacement: () => (''),
                } ],
              }),
            },
          ],
        }),
      },
      {
        test: /theme\.s?css$/,
        include: [
          /block-library/,
        ],
        use: themeBlocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /\.s?css$/,
        exclude: [
          /block-library/,
        ],
        use: mainCSSExtractTextPlugin.extract(extractConfig),
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
    themeBlocksCSSPlugin,
    mainCSSExtractTextPlugin,
    // wrapping editor style with .gutenberg__editor class
    new PostCssWrapper('./css/block-library/edit-blocks.css', '.gutenberg__editor'),
    new StringReplacePlugin(),
    // Create RTL files with a -rtl suffix
    new WebpackRTLPlugin({
      suffix: '-rtl',
      minify: process.env.NODE_ENV === 'production' ? { safe: true } : false,
    }),
    new CustomTemplatedPathPlugin({
      basename (path, data) {
        let rawRequest;

        const entryModule = get(data, [ 'chunk', 'entryModule' ], {});
        switch (entryModule.type) {
          case 'javascript/auto':
            rawRequest = entryModule.rawRequest;
            break;

          case 'javascript/esm':
            rawRequest = entryModule.rootModule.rawRequest;
            break;
        }

        if (rawRequest) {
          return basename(rawRequest);
        }

        return path;
      },
    }),
    new LibraryExportDefaultPlugin([
      'api-fetch',
      'deprecated',
      'dom-ready',
      'redux-routine',
    ].map(camelCaseDash)),
    new CopyWebpackPlugin(
      gutenbergPackages.map(packageName => ({
        from: `./node_modules/gutenberg/packages/${packageName}/build-style/*.css`,
        to: `./css/${packageName}/`,
        flatten: true,
        transform: content => {
          if (config.mode === 'production') {
            return postcss([
              require('cssnano')({
                preset: 'default',
              }),
            ])
            .process(content, { from: 'src/app.css', to: 'dest/app.css' })
            .then(result => result.css);
          }
          return content;
        },
      }))
    ),
  ],
  stats: {
    children: false,
  },
};

if (config.mode !== 'production') {
  config.devtool = process.env.SOURCEMAP || 'source-map';
}

if (config.mode === 'development') {
  config.plugins.push(new LiveReloadPlugin({ port: process.env.GUTENBERG_LIVE_RELOAD_PORT || 35729 }));
}

module.exports = config;
