import { WordPressDataType, SanitySchemaType } from './types';

export const BASE_URL = `https://bdkadvokati.com/wp-json/wp/v2`;
export const PER_PAGE = 100;

export const WP_TYPE_TO_SANITY_SCHEMA_TYPE: Record<
  WordPressDataType,
  SanitySchemaType
> = {
  categories: 'category',
  posts: 'post',
  users: 'author',
};
