'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './src/sanity/env';
import { structure } from './src/sanity/structure';
import schemaTypes from './src/sanity/schemaTypes';
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
      languageField: 'language',
      schemaTypes: ['blinkdraft'],
    }),
    muxInput({ max_resolution_tier: '2160p' }),
  ],
});
