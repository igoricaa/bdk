import type {
  WP_REST_API_Categories,
  WP_REST_API_Posts,
  WP_REST_API_Users,
} from 'wp-types';

export type WordPressDataType = 'categories' | 'posts' | 'users';

export type WordPressDataTypeResponses = {
  categories: WP_REST_API_Categories;
  posts: WP_REST_API_Posts;
  users: WP_REST_API_Users;
};

export type SanitySchemaType = 'category' | 'post' | 'author';
