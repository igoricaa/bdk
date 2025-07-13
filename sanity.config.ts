'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { structure } from './sanity/structure';
import schemaTypes from './sanity/schemaTypes';
import { documentInternationalization } from '@sanity/document-internationalization';
import { muxInput } from 'sanity-plugin-mux-input';

export default defineConfig({
  title: 'BDK Advokati',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'sr', title: 'Serbian' },
      ],
      schemaTypes: ['blinkdraft'],
    }),
    muxInput({ max_resolution_tier: '2160p' }),
  ],
});
