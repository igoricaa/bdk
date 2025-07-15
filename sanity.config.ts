'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './src/sanity/env';
import { structure } from './src/sanity/structure';
import schemaTypes from './src/sanity/schemaTypes';
import { documentInternationalization } from '@sanity/document-internationalization';
import { muxInput } from 'sanity-plugin-mux-input';

// console.log('Verifying Mux Token ID:', process.env.SANITY_STUDIO_MUX_TOKEN_ID);
// console.log(
//   'Verifying Mux Token Secret:',
//   process.env.SANITY_STUDIO_MUX_TOKEN_SECRET
// );

// console.log(
//   'Verifying PUBLIC Mux Token ID:',
//   process.env.NEXT_PUBLIC_SANITY_STUDIO_MUX_TOKEN_ID
// );
// console.log(
//   'Verifying PUBLIC Mux Token Secret:',
//   process.env.NEXT_PUBLIC_SANITY_STUDIO_MUX_TOKEN_SECRET
// );

// console.log('Verifying SIMPLE Mux Token ID:', process.env.MUX_TOKEN_ID);
// console.log('Verifying SIMPLE Mux Token Secret:', process.env.MUX_TOKEN_SECRET);

// console.log(
//   'Verifying SIMPLE PUBLIC Mux Token ID:',
//   process.env.NEXT_PUBLIC_MUX_TOKEN_ID
// );
// console.log(
//   'Verifying SIMPLE PUBLIC Mux Token Secret:',
//   process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET
// );

// if (typeof window !== 'undefined') {
//   process.env.SANITY_STUDIO_MUX_TOKEN_ID =
//     process.env.NEXT_PUBLIC_SANITY_STUDIO_MUX_TOKEN_ID;
//   process.env.SANITY_STUDIO_MUX_TOKEN_SECRET =
//     process.env.NEXT_PUBLIC_SANITY_STUDIO_MUX_TOKEN_SECRET;
// }

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
