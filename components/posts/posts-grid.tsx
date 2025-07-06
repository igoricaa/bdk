'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'motion/react';
import SectionHeader from '../ui/section-header/section-header';
import PostCard from './post-card';
import PostsFilters from './posts-filters';
import { Button } from '../ui/button';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { fetchPaginatedPosts } from '@/app/actions/posts';
import { cn } from '@/lib/utils';

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  count: number | null;
}

interface PostsGridProps {
  categories: Category[];
  initialPosts: any[];
  allPostsCount: number;
  className?: string;
}

const PostsGrid = ({
  categories,
  initialPosts,
  allPostsCount,
  className,
}: PostsGridProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const intersectionRef = useRef(null);

  // TanStack Query infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', activeCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await fetchPaginatedPosts({
        categorySlug: activeCategory,
        page: pageParam,
      });

      if (!result?.data?.success) {
        throw new Error(result?.data?.error || 'Failed to fetch posts');
      }

      return result.data.data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 0,
    initialData:
      activeCategory === 'all'
        ? {
            pages: [
              {
                posts: initialPosts,
                nextPage: initialPosts.length >= 9 ? 1 : null,
                totalCount: allPostsCount,
                hasNextPage: initialPosts.length >= 9,
              },
            ],
            pageParams: [0],
          }
        : undefined,
  });

  // Handle infinite scroll on mobile using Framer Motion's useInView
  const isInView = useInView(intersectionRef, {
    margin: '100px',
    amount: 0.1,
  });

  // Trigger fetch when intersection element comes into view
  const handleIntersect = useCallback(() => {
    if (isMobile && hasNextPage && !isFetchingNextPage && isInView) {
      fetchNextPage();
    }
  }, [isMobile, hasNextPage, isFetchingNextPage, isInView, fetchNextPage]);

  // Use effect to handle intersection
  useEffect(() => {
    handleIntersect();
  }, [handleIntersect]);

  // Handle manual load more on desktop
  const handleLoadMore = () => {
    if (!isMobile && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Flatten all posts from all pages
  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];

  if (isLoading) {
    return (
      <section
        className={cn(
          'px-side pt-19 pb-25 md:pt-25 md:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
          className
        )}
      >
        <SectionHeader heading='BDKnowledge' colorVariant='dark' />
        <div className='mt-12 md:mt-5 xl:mt-11 2xl:mt-20 flex justify-center'>
          <div className='text-white'>Loading posts...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className={cn(
          'px-side pt-19 pb-25 md:pt-25 md:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
          className
        )}
      >
        <SectionHeader heading='BDKnowledge' colorVariant='dark' />
        <div className='mt-12 md:mt-5 xl:mt-11 2xl:mt-20 flex justify-center'>
          <div className='text-red-500'>
            Error: {error?.message || 'Failed to load posts'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'px-side pt-19 pb-25 md:pt-25 md:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
        className
      )}
    >
      <SectionHeader
        heading='BDKnowledge'
        colorVariant='dark'
        rightSideComponent={
          <PostsFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            allPostsCount={allPostsCount}
            variant='dark'
          />
        }
      />

      <div className='mt-12 md:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-9'>
        {allPosts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Loading state for more posts */}
      {isFetchingNextPage && (
        <div className='mt-12 flex justify-center'>
          <div className='text-white'>Loading more posts...</div>
        </div>
      )}

      {/* Mobile: Infinite scroll trigger */}
      {isMobile && hasNextPage && (
        <div
          ref={intersectionRef}
          className='h-10 flex justify-center items-center mt-8'
        >
          <div className='text-white text-sm opacity-50'>
            Scroll for more...
          </div>
        </div>
      )}

      {/* Desktop: Load More button */}
      {!isMobile && hasNextPage && (
        <div className='mt-12 flex justify-center'>
          <Button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className='bg-light-blue hover:bg-light-blue/80 text-white px-8 py-3'
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* No more posts message */}
      {!hasNextPage && allPosts.length > 0 && (
        <div className='mt-12 flex justify-center'>
          <div className='text-white text-sm opacity-70'>
            You've reached the end of the posts
          </div>
        </div>
      )}
    </section>
  );
};

export default PostsGrid;
