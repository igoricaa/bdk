'use server';

import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { sanityFetch } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';

const POSTS_PER_PAGE = 9;
const FEATURED_POSTS_COUNT = 3; // Skip first 3 posts as they're used for featured posts

// Schema for the input parameters
const fetchPostsSchema = z.object({
  categorySlug: z.string(),
  page: z.number().min(0).default(0),
});

// Query to fetch paginated posts
const PAGINATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && references(*[_type=="category" && slug.current == $categorySlug]._id)] 
  | order(date desc)[$start...$end] {
    _id,
    title,
    slug,
    date,
    categories[]->{
      _id,
      name,
      slug
    }
  }
`);

// Query to get total count for pagination info
const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && references(*[_type=="category" && slug.current == $categorySlug]._id)])
`);

export const fetchPaginatedPosts = createSafeActionClient()
  .schema(fetchPostsSchema)
  .action(async ({ parsedInput: { categorySlug, page } }) => {
    try {
      const start = FEATURED_POSTS_COUNT + page * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE - 1;

      // For "all" category, we need to fetch from bdknowledge parent category
      const actualCategorySlug =
        categorySlug === 'all' ? 'bdknowledge' : categorySlug;

      const [posts, totalCount] = await Promise.all([
        sanityFetch({
          query: PAGINATED_POSTS_QUERY,
          params: {
            categorySlug: actualCategorySlug,
            start,
            end,
          },
          tags: ['posts', `posts-${actualCategorySlug}`, 'categories'],
          revalidate: 43200,
        }),
        sanityFetch({
          query: POSTS_COUNT_QUERY,
          params: {
            categorySlug: actualCategorySlug,
          },
          tags: ['posts', `posts-${actualCategorySlug}`, 'categories'],
          revalidate: 43200,
        }),
      ]);

      const filteredPosts =
        categorySlug === 'all'
          ? posts
          : posts.filter((post: any) =>
              post.categories.some(
                (cat: any) => cat.slug.current === categorySlug
              )
            );

      const hasNextPage = start + POSTS_PER_PAGE < totalCount;

      return {
        success: true,
        data: {
          posts: filteredPosts,
          nextPage: hasNextPage ? page + 1 : null,
          totalCount,
          hasNextPage,
        },
      };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      return {
        success: false,
        error: 'Failed to fetch posts',
      };
    }
  });
