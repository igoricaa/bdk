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
import { buildCategoryTree, CategoryWithChildren } from '@/lib/utils';
import { Suspense } from 'react';

const PublicationsPage = async () => {
  const slug = 'publications';

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

  const latestYear = availableYears[0] || new Date().getFullYear().toString();

  const filterOptions: FilterOption[] = [
    { slug: latestYear, label: 'Latest' },
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
          heading='Publications'
          categorySlug={slug}
          filterOptions={filterOptions}
          initialPosts={posts}
          latestYear={latestYear}
          categoryTree={categoryTree as CategoryWithChildren}
        />
      </Suspense>
    </main>
  );
};

export default PublicationsPage;
