![gutenberg-js](gutenberg_js_logo.svg?sanitize=true "gutenberg-js")

# gutenberg-js

We made [Gutenberg](https://github.com/Wordpress/gutenberg) editor a little more **customizable**!

Gutenberg editor can **be easly included in your apps** with this [package](https://github.com/front/gutenberg-js).

This package is based on [Gutenberg v4.4.0](https://github.com/WordPress/gutenberg/releases/tag/v4.4.0) and respective @wordpress packages versions.

## Table of contents

* [Installation](#installation)
  * [Dependencies](#dependencies)
* [Development](#development)
* [Global variables](#global-variables)
  * [apiFetch](#apifetch)
    * [Post Types](#post-types)
      * [Wp block](#wp-block)
    * [Posts and Pages](#posts-and-pages)
    * [Categories](#categories)
    * [Media](#media)
    * [Taxonomies](#taxonomies)
    * [Blocks](#blocks)
    * [Themes](#themes)
  * [url](#url)
* [Usage](#usage)
  * [Gutenberg Stores](#gutenberg-stores)
  * [Registering Custom Blocks](#registering-custom-blocks)
* [Customize your Gutenberg](#customize-your-gutenberg)
  * [Events](#events)
* [Rendering Dynamic Blocks](#rendering-dynamic-blocks)
* [Custom blocks](#custom-blocks)
  * [Creating and Registering](#creating-and-registering)
  * [Sharing](#sharing)

## Installation

**gutenberg-js** is available through npm.

```sh
$ npm install @frontkom/gutenberg-js
```

[↑ Go up to Table of contents](#table-of-contents)

### Dependencies

Some of the Gutenberg features depend on the [TinyMCE](https://www.tinymce.com/) text editor and the editor expects to find TinyMCE *plugins*, *themes* and *skins* on the project root. Since **gutenberg-js** has TinyMCE as a dependency, we suggest to use webpack and [CopyWebpackPlugin](https://github.com/webpack-contrib/copy-webpack-plugin) to handle with that.

```js
// webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/tinymce/plugins', to: `${ your_root_path }/plugins` },
            { from: 'node_modules/tinymce/themes', to: `${ your_root_path }/themes` },
            { from: 'node_modules/tinymce/skins', to: `${ your_root_path }/skins` },
        ], {}),
    ],
    ...
}
```

GutenbergJS expects to find React (v16.6.3), ReactDOM (v16.6.3), moment (v2.22.1) and jquery (v1.12.4) libraries in the environment it runs. Maybe you would add the following lines to your pages.

```html
<script src="https://unpkg.com/react@16.6.3/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.6.3/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/moment@2.22.1/min/moment.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
```

[↑ Go up to Table of contents](#table-of-contents)

## Development

The main goal of Gutenberg JS is to expose all Gutenberg packages and keep them up-to-date.

In order to ensure Gutenberg JS never breaks because of our overrides, we had to use fixed versions for the overrided packages in `package.json`.

So everytime we have to update Gutenberg JS, there are several steps we must follow:

1. Check @wordpress packages versions from Gutenberg release we want to upgrade to and update `package.json` file (`npm outdated` could help).
2. Check if there are new @wordpress packages and import them in `index.js` file'.
3. Check if our overrides are updated and work well with new @wordpress packages versions.
4. Check if there are new blocks containing images and apply `data` attributes override.
5. Test, test and test. We can use [g-editor](https://github.com/front/g-editor) to test the editor.
6. [To do: unit tests could help]

[↑ Go up to Table of contents](#table-of-contents)

## Global variables

Gutenberg depends on several global variables: `wp`, `userSettings`, `wpEditorL10n`, `wpApiSettings`, etc and probably during your Gutenberg experiencie you will discover other required variables, please share with us if you feel they are important to Gutenberg execution.

Here we're only presenting those variables which - by our experience - we belive are crucial to Gutenberg and already set to them default values. If you don't set them up, you'll see that Gutenberg editor won't run.

So we recommend you to set up them all in one file called `globals.js` or `settings.js` for example and import them **before** Gutenberg call. Feel free to override Gutenberg global variables if you need.

```js
// globals.js

window.wp = {
    apiFetch,
    url: { addQueryArgs },
    ...,
};

window.userSettings = {
    uid: 2, // Among other things, this uid is used to identify and store editor user preferences in localStorage
};

// set your root path
window.wpApiSettings = {
    root: 'YOUR_ROOT_PATH',
    ...,
};
```

We are working to include on **gutenberg-js** all settings that shouldn't be part of your apps, but you always can override them if you need.

[↑ Go up to Table of contents](#table-of-contents)

### apiFetch

Those two are very important for comunication between the editor and remaining app, so you should set them up according your needs.

***apiFetch*** is the method that will handle with data operations on Gutenberg, like getting resources (categories for example), saving page changes or deleting pages, etc. It receives an object with `path`, `method`, `data`, etc, so you can treat it as you want.

```js
function apiFetch(options) {
    // Do something with those options like calling an API
    // or actions from your store...
}
```

Next, we will show some commons API requests Gutenberg does and the respective response it expects. For more information, you can check the [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/reference/post-revisions/).

[↑ Go up to Table of contents](#table-of-contents)

#### Post Types

The Gutenberg editor will ask for available **Post Types** through `/wp/v2/types/?context=edit` request. The _type_ properties that can be checked in [WordPress documentation](https://developer.wordpress.org/rest-api/reference/post-types/).

**Post Types:** _post_, _pages_, _attachment_, _wp_block_

**Request for post type settings:** `/wp/v2/types/post?context=edit`

**Request for page type settings:** `/wp/v2/types/page?context=edit`

[↑ Go up to Table of contents](#table-of-contents)

##### Wp Block

There is no documentation for `/wp/v2/types/wp_block?context=edit` request yet, but the response should be similar to post and page responses:

```js
{
    "capabilities": { ... }
    "description": "",
    "hierarchical": false,
    "labels": { ... }
    "name": "Blocks",
    "slug": "wp_block",
    "taxonomies": [],
    "rest_base": "blocks",
    "supports": { ... }
    "viewable": false,
    "_links": { ... }
}
```

[↑ Go up to Table of contents](#table-of-contents)

#### Posts and Pages

Check the WordPress API documentation for [Posts](https://developer.wordpress.org/rest-api/reference/posts/) and [Pages](https://developer.wordpress.org/rest-api/reference/pages/) requests.

[↑ Go up to Table of contents](#table-of-contents)

#### Categories

Check the WordPress API documentation for [Categories](https://developer.wordpress.org/rest-api/reference/categories/).

[↑ Go up to Table of contents](#table-of-contents)

#### Taxonomies

Taxonomies and Categories are requested to fill Categories panel in Document sidebar. Check the WordPress API documentation for [Taxonomies](https://developer.wordpress.org/rest-api/reference/taxonomies/).

[↑ Go up to Table of contents](#table-of-contents)

#### Media

Here is the WordPress API documentation for [Media](https://developer.wordpress.org/rest-api/reference/media/). The **gutenberg-js** introduces the `data` property which is an object with all data attributes you want to add to image/media DOM element.

```js
{
    ...,
    id: 1527069591355,
    link: MEDIA_LINK_HERE,
    source_url: MEDIA_URL_HERE,
    // Additionaly, you can add some data attributes for images for example
    data: { entity_type: 'file', entity_uuid: 'e94e9d8d-4cf4-43c1-b95e-1527069591355' }
    ...,
}
```

The editor also requests for `wp/v2/media` OPTIONS:

```js
{
    headers: {
        get: value => {
            if (value === 'allow') {
                return [ 'POST' ];
            }
        },
    },
}
```

[↑ Go up to Table of contents](#table-of-contents)

#### Blocks

There is no documentation for `/wp/v2/wp_blocks` or `/wp/v2/blocks` request yet, but the response should be similar to posts and pages responses with and `id` and `content`:

```js
{
    content: "<!-- wp:paragraph -->↵    <p>3</p>↵    <!-- /wp:paragraph -->",
    id: 131,
    title: "my block",
}
```

Gutenberg editor allows us to create, edit, list, get one and delete one block operations, so make sure you expect GET, POST, PUT and DELETE requests.

[↑ Go up to Table of contents](#table-of-contents)

#### Themes

Gutenberg will ask for the [theme features](https://codex.wordpress.org/Theme_Features) through the index request (`/wp/v2/themes`). The response should be the following object.

```js
{
    ...,
    theme_supports: {
        formats: [ 'standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio' ],
        'post-thumbnails': true,
    },
    ...,
}
```

[↑ Go up to Table of contents](#table-of-contents)

### url

***url*** should has a function called `addQueryArgs( url, args )` that handles with `url` and `args` and returns the final url to different actions. The original implementation is the following, feel free to keep it or change it according to your needs.

```js
/**
 * External dependencies
 */
import { parse, format } from 'url';
import { parse as parseQueryString, stringify } from 'querystring';

/**
 * Appends arguments to the query string of the url
 *
 * @param  {String} url   URL
 * @param  {Object} args  Query Args
 *
 * @return {String}       Updated URL
 */
export function addQueryArgs(url, args) {
    const queryStringIndex = url.indexOf('?');
    const query = queryStringIndex !== -1 ? parse(url.substr(queryStringIndex + 1)) : {};
    const baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;

    return baseUrl + '?' + stringify({ ...query, ...args });
}
```

[↑ Go up to Table of contents](#table-of-contents)

## Usage

We've tried to make it easy to import **gutenberg-js** modules to your apps.

```js
// Importing global variables that Gutenberg requires
import './globals';

// Importing domReady and editPost modules
import { domReady, editPost } from '@frontkom/gutenberg-js';

// Don't forget to import the style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';

// DOM element id where editor will be displayed
const target = 'editor';

// Post properties
const postType = 'post'; // or 'page'
const postId = 123;

// Some editor settings
const settings = {
    alignWide: true,
    availableTemplates: [],
    allowedBlockTypes: true,
    disableCustomColors: false,
    disableCustomFontSizes: false,
    disablePostFormats: false,
    titlePlaceholder: "Add title",
    bodyPlaceholder: "Write your story",
    isRTL: false,
    autosaveInterval: 10,
    styles: [],
    postLock: {
        isLocked: false,
    },
    ...
    // @frontkom/gutenberg-js settings
    canAutosave: false,  // to disable the Editor Autosave feature (default: true)
    canPublish: false,   // to disable the Editor Publish feature (default: true)
    canSave: false,      // to disable the Editor Save feature (default: true)
    mediaLibrary: false, // to disable the Media Library feature (default: true)
};

// Post properties to override
const overridePost = {};

// Et voilá... Initializing the editor!
window._wpLoadGutenbergEditor = new Promise(function (resolve) {
    domReady(function () {
        resolve(editPost.initializeEditor(target, postType, postId, settings, overridePost));
    });
});
```

**Note**: Gutenberg requires utf-8 encoding, so don't forget to add `<meta charset="utf-8">` tag to your html `<head>`.

[↑ Go up to Table of contents](#table-of-contents)

### Gutenberg Stores

Additionally, after initializing the editor, you can have access to Gutenberg stores (`core`, `core/blocks`, `core/data`, `core/edit-post`, `core/editor`, `core/viewport`) through the `data` module and its `select` and `dispatch` methods:

```js
// Importing select and dispatch methods from @frontkom/gutenberg-js package
import { data } from '@frontkom/gutenberg-js';

// Use dispatch to change the state of something
data.dispatch('core/edit-post').openGeneralSidebar('edit-post/block');
data.dispatch('core/edit-post').closeGeneralSidebar();

// Use select to get the state of something
data.select( 'core/editor' ).getEditedPostContent();
// <!-- wp:paragraph -->
// <p>Hello</p>
// <!-- /wp:paragraph -->

```

[↑ Go up to Table of contents](#table-of-contents)

### Registering Custom Blocks

You can create your custom blocks using the `registerBlockType` method from `blocks` module. Check out the example below and the Wordpress [documentation](https://wordpress.org/gutenberg/handbook/blocks/) to read more about it.

```js
import { blocks, editor } from '@frontkom/gutenberg-js';

const {
    AlignmentToolbar,
    BlockControls,
    RichText,
} = editor;

blocks.registerBlockType('custom/my-block', {
    title: 'My first block',
    icon: 'universal-access-alt',
    category: 'common',
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
        alignment: {
            type: 'string',
        },
    },
    edit({ attributes, className, setAttributes }) {
        const { content, alignment } = attributes;

        function onChangeContent( newContent ) {
            setAttributes( { content: newContent } );
        }

        function onChangeAlignment( newAlignment ) {
            setAttributes( { alignment: newAlignment } );
        }

        return [
            <BlockControls>
                <AlignmentToolbar
                    value={ alignment }
                    onChange={ onChangeAlignment }
                />
            </BlockControls>,
            <RichText
                tagName="p"
                className={ className }
                style={ { textAlign: alignment } }
                onChange={ onChangeContent }
                value={ content }
            />
        ];
    },
    save({ attributes, className }) {
        const { content, alignment } = attributes;

        return (
            <RichText.Content
                className={ className }
                style={ { textAlign: alignment } }
                value={ content }
            />
        );
    },
});

```

[↑ Go up to Table of contents](#table-of-contents)

## Customize your Gutenberg

Following the same logic, we've created the `customGutenberg` global object where you can set eveything that we made customizable on Gutenberg.

```js
window.customGutenberg = { ... };
```

As the other global variables, `customGutenberg` should be defined **before** Gutenberg import.

Important to say that Gutenberg works perfectly without the settings of this object :)

[↑ Go up to Table of contents](#table-of-contents)

### Events

**gutenberg-js** makes possible to define callbacks (or effects) for Gutenberg actions. Since it is an experimental feature, we are only providing this for 'OPEN_GENERAL_SIDEBAR' and 'CLOSE_GENERAL_SIDEBAR' actions.

```js
window.customGutenberg = {
    ...,
    events: {
        'OPEN_GENERAL_SIDEBAR': function(action, store) {
            console.log( 'OPEN_GENERAL_SIDEBAR', action, store );
        },
        'CLOSE_GENERAL_SIDEBAR': function(action, store) {
            console.log( 'CLOSE_GENERAL_SIDEBAR', action, store );
        },
    },
    ...,
};
```

[↑ Go up to Table of contents](#table-of-contents)

## Rendering Dynamic Blocks

As you probably know, Gutenberg allows us to create our owns blocks inside the editor and make them reusable. We can look for reusable blocks in the 'Add Blocks Menu' search bar.

If we change to 'Code Editor' mode, we can check that only a `ref` id is saved for our reusable block.

```js
<!-- wp:block {"ref":1537389905603} /-->
```

Gutenberg uses `wp/v2/wp_blocks/[:id]` request to get the block content inside the editor. Make sure you do the same process when your app do the final render of the page (outside of the editor).

The same happens with embed blocks:

```js
<!-- wp:core-embed/twitter {"url": "https://twitter.com/drupalgutenberg/status/1040203765452820480", "type": "rich", "providerNameSlug": "twitter"} -->
<figure class="wp-block-embed-twitter wp-block-embed is-type-rich is-provider-twitter">
    <div class="wp-block-embed__wrapper">
        https://twitter.com/drupalgutenberg/status/1040203765452820480
    </div>
</figure>
<!-- /wp:core-embed/twitter -->
```

And latest posts widget:

```js
<!-- wp:latest-posts /-->
```

Your app must be in charge of the render of the dynamic blocks.

[↑ Go up to Table of contents](#table-of-contents)

## Custom Blocks

We can create **custom blocks** to our Gutenberg editor and used them to build our website pages.

[↑ Go up to Table of contents](#table-of-contents)

### Creating and Registering

A Gutenberg block requires some properties like a `title`, an `icon`, a `category` and the `edit` and the `save` methods which describe the structure of the block inside the editor and what block content should be saved.

```js
const myFirstBlock = {
    title: 'My first block!',
    icon: 'universal-access-alt',
    category: 'cloudblocks',

    edit() {
        return <p>Hello editor.</p>;
    },

    save() {
        return <p>Hello saved content.</p>;
    },
};
```

After defining all the properties, the new block must be registered so it becomes available in editor inserter dialog under the choosen category. If the blocks's category doesn't exist yet, we must add it to the editor inserter dialog.

A block's category requires a slug and a title:

```js
const category = {
    slug: 'cloudblocks',
    title: 'Gutenberg-Cloud Blocks',
};
```

To check which categories already exist, we can use `getCategories()` selector and to add a new category to the editor we can use `setCategories()` action. Both methods are provided by Gutenberg `core/blocks` store which are accessible througg `wp.data`.

```js
const { dispatch, select } = wp.data;

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);

dispatch('core/blocks').setCategories([ category, ...currentCategories ]);
```

Finally, we are ready to register our custom block using `registerBlockType` method:

```js
const { registerBlockType } = wp.blocks;

registerBlockType(`${category.slug}/my-first-block`, { category: category.slug, ...hero.settings });
```

And the block is available in the editor inserter dialog! There is the full example:

```js
const { dispatch, select } = wp.data;
const { registerBlockType } = wp.blocks;

// Setting block's properties
const myFirstBlock = {
    title: 'My first block!',
    icon: 'universal-access-alt',
    category: 'cloudblocks',

    edit() {
        return <p>Hello editor.</p>;
    },

    save() {
        return <p>Hello saved content.</p>;
    },
};

// Setting category's properties
const category = {
    slug: 'cloudblocks',
    title: 'Gutenberg-Cloud Blocks',
};

// Checking the category
const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

// Registering the new block
registerBlockType(`${category.slug}/my-first-block`, myFirstBlock);
```

In [Creating Block Types](https://wordpress.org/gutenberg/handbook/blocks/) section of Gutenberg handbook, we can check more examples of how to custom blocks with more complexity. Also we can check more details about blocks properties in [Block API](https://wordpress.org/gutenberg/handbook/block-api/) documentation.

[↑ Go up to Table of contents](#table-of-contents)

### Sharing

An easy way to share a custom block is to publish the block as a npm package.

Here is an example of a custom block npm package, the [Hero Section](https://github.com/front/g-hero-section).

[↑ Go up to Table of contents](#table-of-contents)
