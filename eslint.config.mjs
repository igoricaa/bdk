// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;

import studio from '@sanity/eslint-config-studio';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import * as typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  ...studio,
  {
    ignores: ['dist', 'node_modules', '.sanity', 'scripts', 'migrations'],
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['**/sanity.config.ts', '**/sanity.cli.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
