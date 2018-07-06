/**
 * External dependencies
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const { get } = require('lodash');
const { basename, resolve } = require('path');

/**
 * WordPress dependencies
 */
const CustomTemplatedPathPlugin = require('@wordpress/custom-templated-path-webpack-plugin');
const LibraryExportDefaultPlugin = require('./node_modules/gutenberg/packages/library-export-default-webpack-plugin');

// Main CSS loader for everything but blocks..
const mainCSSExtractTextPlugin = new ExtractTextPlugin({
  filename: './css/style.css',
});

// CSS loader for styles specific to block editing.
const editBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/core-blocks/edit-blocks.css',
});

// CSS loader for styles specific to blocks in general.
const blocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/core-blocks/style.css',
});

// CSS loader for default visual block styles.
const themeBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './css/core-blocks/theme.css',
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          require('./node_modules/gutenberg/packages/postcss-themes')({
            defaults: {
              primary: '#0085ba',
              secondary: '#11a0d2',
              toggle: '#11a0d2',
              button: '#0085ba',
              outlines: '#007cba',
            },
            themes: {
              'admin-color-light': {
                primary: '#0085ba',
                secondary: '#c75726',
                toggle: '#11a0d2',
                button: '#0085ba',
                outlines: '#007cba',
              },
              'admin-color-blue': {
                primary: '#82b4cb',
                secondary: '#d9ab59',
                toggle: '#82b4cb',
                button: '#d9ab59',
                outlines: '#417e9B',
              },
              'admin-color-coffee': {
                primary: '#c2a68c',
                secondary: '#9fa47b',
                toggle: '#c2a68c',
                button: '#c2a68c',
                outlines: '#59524c',
              },
              'admin-color-ectoplasm': {
                primary: '#a7b656',
                secondary: '#c77430',
                toggle: '#a7b656',
                button: '#a7b656',
                outlines: '#523f6d',
              },
              'admin-color-midnight': {
                primary: '#e14d43',
                secondary: '#77a6b9',
                toggle: '#77a6b9',
                button: '#e14d43',
                outlines: '#497b8d',
              },
              'admin-color-ocean': {
                primary: '#a3b9a2',
                secondary: '#a89d8a',
                toggle: '#a3b9a2',
                button: '#a3b9a2',
                outlines: '#5e7d5e',
              },
              'admin-color-sunrise': {
                primary: '#d1864a',
                secondary: '#c8b03c',
                toggle: '#c8b03c',
                button: '#d1864a',
                outlines: '#837425',
              },
            },
          }),
          require('autoprefixer'),
          require('postcss-color-function'),
        ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        includePaths: [ 'node_modules/gutenberg/edit-post/assets/stylesheets' ],
        data: '@import "colors"; @import "breakpoints"; @import "variables"; @import "mixins"; @import "animations";@import "z-index";',
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
  'blocks',
  'components',
  'editor',
  'utils',
  'viewport',
  'edit-post',
  'core-blocks',
  'nux',
];

const gutenbergPackages = [
  'blob',
  'core-data',
  'data',
  'date',
  'deprecated',
  'dom',
  'element',
  'keycodes',
  'plugins',
  'shortcode',
];

const coreGlobals = [
  'api-request',
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

// make them external global vars
[
  ...coreGlobals,
  // ...gutenbergPackages,
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
      __dirname,
      'node_modules',
    ],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.pegjs/,
        use: 'pegjs-loader',
      },
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
            // include: [ resolve( __dirname, 'node_modules/gutenberg' ) ],
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
          /core-blocks/,
        ],
        use: blocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /editor\.s?css$/,
        include: [
          /core-blocks/,
        ],
        use: editBlocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /theme\.s?css$/,
        include: [
          /core-blocks/,
        ],
        use: themeBlocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /\.s?css$/,
        exclude: [
          /core-blocks/,
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
    new LibraryExportDefaultPlugin([ 'deprecated', 'dom-ready', 'api-request' ].map(camelCaseDash)),
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
