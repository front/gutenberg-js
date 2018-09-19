/**
 * External Dependencies
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
import PostStatus from '../post-status';
import PostExcerpt from '../post-excerpt';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImage from '../featured-image';
import DiscussionPanel from '../discussion-panel';
import LastRevision from '../last-revision';
import PageAttributes from '../page-attributes';
import MetaBoxes from '../../meta-boxes';
import SettingsHeader from '../settings-header';
import Sidebar from '../';

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
      <MetaBoxes location="side" />
    </Panel>
  </Sidebar>
);

export default DocumentSidebar;
