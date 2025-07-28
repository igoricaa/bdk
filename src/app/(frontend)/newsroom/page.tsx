import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/src/components/posts/featured-posts-section';
import PostsGrid from '@/src/components/posts/posts-grid';
import {
  getGlobalFeaturedPosts,
  getPostsByCategory,
  getYearsByCategory,
} from '@/src/sanity/lib/cached-queries';
import { Suspense } from 'react';
import { getYearsFilterOptions } from '@/src/lib/utils';
import { InViewWrapper } from '@/src/components/ui/in-view-wrapper';

const NewsroomPage = async () => {
  const slug = 'newsroom';
  const [featuredPosts, { posts }, postYears] = await Promise.all([
    getGlobalFeaturedPosts(slug),
    getPostsByCategory(slug),
    getYearsByCategory(slug),
  ]);

  if (!featuredPosts || !posts) {
    return <div>No posts found</div>;
  }

  const yearFilterOptions = getYearsFilterOptions(postYears);

  return (
    <main id='blogPage' className='pt-header'>
      <InViewWrapper>
        <FeaturedPostsSection
          featuredPosts={featuredPosts as Post[]}
          className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
        />
        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsGrid
            heading='Newsroom'
            initialPosts={posts}
            showSidebar={false}
            yearFilterOptions={yearFilterOptions}
            initialCategory={slug}
            initialYear='all'
          />
        </Suspense>
      </InViewWrapper>
    </main>
  );
};

export default NewsroomPage;
