import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/src/components/posts/featured-posts-section';
import PostsGrid from '@/src/components/posts/posts-grid';
import {
  getGlobalFeaturedPosts,
  getYearsByCategory,
  getNestedCategories,
  getPostsByCategory,
} from '@/src/sanity/lib/cached-queries';
import {
  buildCategoryTree,
  CategoryWithChildren,
  getYearsFilterOptions,
} from '@/src/lib/utils';
import { Suspense } from 'react';

const BlogPage = async () => {
  const slug = 'blog';

  const [featuredPosts, { posts }, postYears, nestedCategoriesData] =
    await Promise.all([
      getGlobalFeaturedPosts(slug),
      getPostsByCategory(slug),
      getYearsByCategory(slug),
      getNestedCategories(slug),
    ]);

  if (!featuredPosts || !posts) {
    return <div>No posts found</div>;
  }

  const categoryTree = buildCategoryTree(
    nestedCategoriesData?.rootCategory || null,
    nestedCategoriesData?.allCategories || []
  );

  const yearFilterOptions = getYearsFilterOptions(postYears);

  return (
    <main id='blogPage' className='pt-header'>
      <FeaturedPostsSection
        featuredPosts={featuredPosts as Post[]}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
      />

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsGrid
          heading='Blog'
          initialPosts={posts}
          showSidebar={true}
          categoryTree={categoryTree as CategoryWithChildren}
          yearFilterOptions={yearFilterOptions}
          initialCategory={slug}
          initialYear='all'
        />
      </Suspense>
    </main>
  );
};

export default BlogPage;
