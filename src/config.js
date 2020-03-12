import * as voltoConfig from '@plone/volto/config';

import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as installEmbed } from 'volto-embed/config';

// Custom RichText styles
import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import superindexSVG from '@plone/volto/icons/superindex.svg';
import subindexSVG from '@plone/volto/icons/subindex.svg';
import HiddenWidget from 'volto-addons/Widgets/Hidden';

const config = [
  plotlyConfig,
  installEmbed,
  dataBlocksConfig,
].reduce((acc, apply) => apply(acc), voltoConfig);

// Custom RichText styles
const SuperIndexButton = createInlineStyleButton({
  style: 'SUPERSCRIPT',
  children: <Icon name={superindexSVG} size="24px" />,
});

const SubIndexButton = createInlineStyleButton({
  style: 'SUBSCRIPT',
  children: <Icon name={subindexSVG} size="24px" />,
});

export const settings = {
  ...config.settings,
  customStyleMap: {
    ...config.settings.customStyleMap,
    SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
    SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' },
  },
  ToHTMLRenderers: {
    ...config.settings.ToHTMLRenderers,
    inline: {
      ...config.settings.ToHTMLRenderers.inline,
      SUBSCRIPT: (children, { key }) => <sub key={key}>{children}</sub>,
      SUPERSCRIPT: (children, { key }) => <sup key={key}>{children}</sup>,
    },
  },
  richTextEditorInlineToolbarButtons: [
    SuperIndexButton,
    SubIndexButton,
    ...config.settings.richTextEditorInlineToolbarButtons,
  ],
};

export const views = {
  ...config.views,
};

export const widgets = {
  ...config.widgets,
  widget: {
    ...config.widgets.widget,
    json: HiddenWidget
  }
};

export const blocks = {
  ...config.blocks,
  initialBlocks: {
    Document: ['title', 'description', 'leadimage']
  },
  requiredBlocks: ['title', 'description']
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
