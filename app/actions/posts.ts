'use server';

import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { sanityFetch } from '@/sanity/lib/client';
import {
  getPostsByYear,
  getPostsByYearCount,
} from '@/sanity/lib/cached-queries';
import {
  PAGINATED_FILTERED_POSTS_COUNT_QUERY,
  PAGINATED_FILTERED_POSTS_QUERY,
} from '@/sanity/lib/queries';

const POSTS_PER_PAGE = 9;

const fetchPostsByYearSchema = z.object({
  categorySlug: z.string(),
  year: z.number(),
  page: z.number().min(0).default(0),
});

export const fetchPostsByYear = createSafeActionClient()
  .schema(fetchPostsByYearSchema)
  .action(async ({ parsedInput: { categorySlug, year, page } }) => {
    try {
      const start = page === 0 ? 0 : page * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE - 1;

      const [posts, totalCount] = await Promise.all([
        getPostsByYear(categorySlug, year.toString(), page, start, end),
        getPostsByYearCount(categorySlug, year.toString()),
      ]);

      const hasNextPage = start + POSTS_PER_PAGE < totalCount;

      return {
        success: true,
        data: {
          posts,
          nextPage: hasNextPage ? page + 1 : null,
          totalCount,
          hasNextPage,
        },
      };
    } catch (error) {
      console.error('Error fetching posts by year:', error);
      return {
        success: false,
        error: 'Failed to fetch posts',
      };
    }
  });

const fetchFilteredPostsSchema = z.object({
  categorySlug: z.string().default('all'),
  year: z.string().optional(),
  page: z.number().min(0).default(0),
});

export const fetchFilteredPosts = createSafeActionClient()
  .schema(fetchFilteredPostsSchema)
  .action(async ({ parsedInput: { categorySlug, year, page } }) => {
    try {
      const start = page === 0 ? 0 : 0 + page * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;

      const queryParams = {
        categorySlug: categorySlug === 'all' ? 'all' : categorySlug,
        year: year && year !== 'all' ? year : null,
        start,
        end,
      };

      const [posts, totalCount] = await Promise.all([
        sanityFetch({
          query: PAGINATED_FILTERED_POSTS_QUERY,
          params: queryParams,
          tags: ['posts', `posts-${categorySlug}`],
        }),
        sanityFetch({
          query: PAGINATED_FILTERED_POSTS_COUNT_QUERY,
          params: queryParams,
          tags: ['posts', `posts-${categorySlug}`],
        }),
      ]);

      const hasNextPage = start + POSTS_PER_PAGE < totalCount;

      return {
        success: true,
        data: {
          posts,
          nextPage: hasNextPage ? page + 1 : null,
          totalCount,
          hasNextPage,
        },
      };
    } catch (error) {
      console.error('Error fetching filtered posts:', error);
      return {
        success: false,
        error: 'Failed to fetch posts',
      };
    }
  });
