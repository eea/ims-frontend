import * as voltoConfig from '@plone/volto/config';

import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as installSidebar } from 'volto-sidebar/config';
import { applyConfig as installEmbed } from 'volto-embed/config';

const config = [
  installSidebar,
  mosaicConfig,
  plotlyConfig,
  installEmbed,
  dataBlocksConfig
].reduce((acc, apply) => apply(acc), voltoConfig);

export const settings = {
  ...config.settings
};

export const views = {
  ...config.views,
};

export const widgets = {
  ...config.widgets,
};

export const blocks = {
  ...config.blocks,
};

// TODO: should we move custom stuff to settings variable?
// It would make future adding new settings types easier, as this file wouldn't
// have to be updated in all frontend implementations
// console.log('config.js AddonReducers', config.addonReducers);
export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

export const viewlets = [...(config.viewlets || [])];

export const portlets = {
  ...config.portlets,
};

export const editForms = {
  ...config.editForms,
};
