import {
  POSTS_BY_CATEGORY_QUERY,
  YEARS_BY_CATEGORY_QUERY,
} from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { Post, POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';

const NewsroomPage = async () => {
  const [{ featuredPosts, allPosts }, postDates] = await Promise.all([
    sanityFetch({
      query: POSTS_BY_CATEGORY_QUERY,
      params: {
        slug: 'newsroom',
      },
      tags: ['newsroom'],
    }) as Promise<POSTS_BY_CATEGORY_QUERYResult>,
    sanityFetch({
      query: YEARS_BY_CATEGORY_QUERY,
      params: {
        slug: 'newsroom',
      },
      tags: ['newsroom-years'],
    }) as Promise<string[]>,
  ]);

  if (!featuredPosts || !allPosts) {
    return <div>No posts found</div>;
  }
  // Extract years from dates, filter from 2015 onwards, get unique values, and sort descending
  const availableYears = Array.from(
    new Set(
      postDates
        .map((date) => new Date(date).getFullYear().toString())
        .filter((year) => parseInt(year) >= 2015)
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const newestYear = availableYears[0] || new Date().getFullYear().toString();

  const filterOptions: FilterOption[] = [
    { slug: newestYear, label: 'Latest' },
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
      <PostsGrid
        heading='Newsroom'
        filterOptions={filterOptions}
        initialPosts={allPosts}
        allPostsCount={allPosts.length}
        newestYear={newestYear}
        filterType='year'
        categorySlug='newsroom'
      />
    </main>
  );
};

export default NewsroomPage;
