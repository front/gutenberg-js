/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { createSlotFill, PanelBody, Panel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import PostStatus from 'gutenberg/edit-post/components/sidebar/post-status';
import PostExcerpt from 'gutenberg/edit-post/components/sidebar/post-excerpt';
import PostTaxonomies from 'gutenberg/edit-post/components/sidebar/post-taxonomies';
import FeaturedImage from 'gutenberg/edit-post/components/sidebar/featured-image';
import DiscussionPanel from 'gutenberg/edit-post/components/sidebar/discussion-panel';
import LastRevision from 'gutenberg/edit-post/components/sidebar/last-revision';
import PageAttributes from 'gutenberg/edit-post/components/sidebar/page-attributes';
import MetaBoxes from 'gutenberg/edit-post/components/meta-boxes';
import SettingsHeader from 'gutenberg/edit-post/components/sidebar/settings-header';
import Sidebar from 'gutenberg/edit-post/components/sidebar';

export const { Fill, Slot } = createSlotFill('PluginDocumentSidebarPanel');

// Plugin to add panels to document sidebar
const PluginDocumentSidebarPanel = ({ children, className, title, initialOpen = false, isOpened, onTogglePanel }) => (
  <Fill>
    <PanelBody
      className={ className }
      initialOpen={ initialOpen || ! title }
      title={ title }
      opened={ isOpened }
      onToggle={ onTogglePanel }
    >
      { children }
    </PanelBody>
  </Fill>
);

PluginDocumentSidebarPanel.Slot = Slot;

export { PluginDocumentSidebarPanel };

const SIDEBAR_NAME = 'edit-post/document';

const DocumentSidebar = () => (
  <Sidebar
    name={ SIDEBAR_NAME }
    label={ __('Editor settings') }
  >
    <SettingsHeader sidebarName={ SIDEBAR_NAME } />
    <Panel>
      <PostStatus />
      <PluginDocumentSidebarPanel.Slot />
      <LastRevision />
      <PostTaxonomies />
      <FeaturedImage />
      <PostExcerpt />
      <DiscussionPanel />
      <PageAttributes />
      <MetaBoxes location="side" usePanel />
    </Panel>
  </Sidebar>
);

export default DocumentSidebar;
