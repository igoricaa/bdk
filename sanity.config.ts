'use client';

import { defineConfig, isDev } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './src/sanity/env';
import { structure } from './src/sanity/structure';
import schemaTypes from './src/sanity/schemaTypes';
import { documentInternationalization } from '@sanity/document-internationalization';
import { muxInput } from 'sanity-plugin-mux-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  title: 'BDK Advokati',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: isDev
    ? [
        structureTool({ structure }),
        visionTool({ defaultDataset: 'dev' }),
        documentInternationalization({
          supportedLanguages: [
            { id: 'en', title: 'English' },
            { id: 'sr', title: 'Serbian' },
          ],
          languageField: 'language',
          schemaTypes: ['blinkdraft'],
        }),
        muxInput({ max_resolution_tier: '2160p' }),
        table(),
      ]
    : [
        structureTool({ structure }),
        visionTool({ defaultDataset: 'dev' }),
        documentInternationalization({
          supportedLanguages: [
            { id: 'en', title: 'English' },
            { id: 'sr', title: 'Serbian' },
          ],
          languageField: 'language',
          schemaTypes: ['blinkdraft'],
        }),
        muxInput({ max_resolution_tier: '2160p' }),
        table(),
      ],
});
