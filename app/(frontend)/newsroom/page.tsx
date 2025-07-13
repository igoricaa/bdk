import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';
import {
  getGlobalFeaturedPosts,
  getPostsByCategory,
  getYearsByCategory,
} from '@/sanity/lib/cached-queries';
import { Suspense } from 'react';

const NewsroomPage = async () => {
  const slug = 'newsroom';
  const [featuredPosts, { posts }, postDates] = await Promise.all([
    getGlobalFeaturedPosts(slug),
    getPostsByCategory(slug),
    getYearsByCategory(slug),
  ]);

  if (!featuredPosts || !posts) {
    return <div>No posts found</div>;
  }

  const availableYears = Array.from(
    new Set(
      postDates
        .map((date) => new Date(date).getFullYear().toString())
        .filter((year) => parseInt(year) >= 2015)
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const latestYear = availableYears[0] || new Date().getFullYear().toString();

  const filterOptions: FilterOption[] = [
    { slug: latestYear, label: 'Latest' },
    ...availableYears.slice(1).map((year) => ({
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
          heading='Newsroom'
          categorySlug={slug}
          filterOptions={filterOptions}
          initialPosts={posts}
          latestYear={latestYear}
        />
      </Suspense>
    </main>
  );
};

export default NewsroomPage;
