import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';
import {
  getGlobalFeaturedPosts,
  getYearsByCategory,
  getNestedCategories,
  getPostsByCategory,
} from '@/sanity/lib/cached-queries';
import { buildCategoryTree } from '@/lib/utils';
import { Suspense } from 'react';

const BlogPage = async () => {
  const slug = 'blog';

  const [featuredPosts, { posts }, postDates, nestedCategoriesData] =
    await Promise.all([
      getGlobalFeaturedPosts(slug),
      getPostsByCategory(slug),
      getYearsByCategory(slug),
      getNestedCategories(slug),
    ]);

  if (!featuredPosts || !posts) {
    return <div>No posts found</div>;
  }

  // Build nested category tree
  const categoryTree = buildCategoryTree(
    nestedCategoriesData?.rootCategory || null,
    nestedCategoriesData?.allCategories || []
  );

  // Simple year filtering - fixed types
  const years = (postDates || [])
    .map((date: any) => new Date(date).getFullYear().toString())
    .filter((year: string) => parseInt(year) >= 2015);

  const availableYears = Array.from(new Set(years)).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const newestYear = availableYears[0] || new Date().getFullYear().toString();

  const filterOptions: FilterOption[] = [
    { slug: newestYear, label: 'Latest' },
    ...availableYears.slice(1).map((year: string) => ({
      slug: year,
      label: year,
    })),
  ];

  return (
    <main id='blogPage' className='pt-header'>
      <FeaturedPostsSection
        featuredPosts={featuredPosts as Post[]}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
      />

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsGrid
          heading='Blog'
          categorySlug={slug}
          filterOptions={filterOptions}
          initialPosts={posts}
          allPostsCount={posts.length}
          newestYear={newestYear}
          filterType='year'
          categoryTree={categoryTree || undefined}
        />
      </Suspense>
    </main>
  );
};

export default BlogPage;
