'use client';

import { useState, useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'motion/react';
import SectionHeader from '../ui/section-header/section-header';
import PostCard from './post-card';
import PostsFilters from './posts-filters';
import { Button } from '../ui/button';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { fetchPaginatedPosts, fetchPostsByYear } from '@/app/actions/posts';
import { cn } from '@/lib/utils';
import PostSkeleton from './post-card-skeleton';
import { FilterOption } from '../ui/filter-buttons';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';

interface PostsGridProps {
  heading: string;
  filterOptions: FilterOption[];
  initialPosts: POSTS_BY_CATEGORY_QUERYResult['allPosts'];
  allPostsCount: number;
  className?: string;
  filterType?: 'category' | 'year';
  categorySlug?: string; // For year filtering, we need to know the category
  newestYear: string;
}

const PostsGrid = ({
  heading,
  filterOptions,
  initialPosts,
  allPostsCount,
  className,
  filterType = 'category',
  categorySlug = 'bdknowledge',
  newestYear,
}: PostsGridProps) => {
  const [activeFilter, setActiveFilter] = useState(
    filterType === 'category' ? 'all' : newestYear
  );
  const isMobile = useIsMobile({ breakpoint: 1024 });
  const intersectionRef = useRef(null);
  const isInView = useInView(intersectionRef, {
    margin: '100px',
    amount: 0.1,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', filterType, categorySlug, activeFilter],
    queryFn: async ({ pageParam = 0 }) => {
      let result;

      if (filterType === 'year' && activeFilter !== 'all') {
        result = await fetchPostsByYear({
          categorySlug,
          year: parseInt(activeFilter),
          page: pageParam,
        });
      } else {
        result = await fetchPaginatedPosts({
          categorySlug: filterType === 'year' ? categorySlug : activeFilter,
          page: pageParam,
        });
      }

      if (!result?.data?.success) {
        throw new Error(result?.data?.error || 'Failed to fetch posts');
      }

      return result.data.data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 0,
    initialData:
      activeFilter === 'all'
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

  useEffect(() => {
    if (isMobile && hasNextPage && !isFetchingNextPage && isInView) {
      fetchNextPage();
    }
  }, [isMobile, hasNextPage, isFetchingNextPage, isInView, fetchNextPage]);

  const handleLoadMore = () => {
    if (!isMobile && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];

  const isInitialLoading = isLoading && !data;
  const isCategorySwitching =
    isFetching && !isFetchingNextPage && !isInitialLoading;

  if (isInitialLoading) {
    return (
      <section
        className={cn(
          'px-side pt-19 pb-25 sm:pt-25 sm:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
          className
        )}
      >
        <SectionHeader heading={heading} colorVariant='dark' />
        <div className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 justify-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-9'>
          {Array.from({ length: 9 }).map((_, index) => (
            <PostSkeleton key={`skeleton-${index}`} className='col-span-1' />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className={cn(
          'px-side pt-19 pb-25 sm:pt-25 sm:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
          className
        )}
      >
        <SectionHeader heading={heading} colorVariant='dark' />
        <div className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 flex justify-center'>
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
        'px-side pt-19 pb-25 sm:pt-25 sm:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
        className
      )}
    >
      <SectionHeader
        heading={heading}
        colorVariant='dark'
        className='md:items-center'
        rightSideComponent={
          <PostsFilters
            options={filterOptions}
            activeCategory={activeFilter}
            onCategoryChange={setActiveFilter}
            variant='dark'
          />
        }
      />

      <div className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-9'>
        {isCategorySwitching
          ? Array.from({ length: 9 }).map((_, index) => (
              <PostSkeleton key={`skeleton-${index}`} />
            ))
          : allPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
      </div>

      {isFetchingNextPage && (
        <div className='mt-12 flex justify-center'>
          <p className='text-light-blue'>Loading more posts...</p>
        </div>
      )}

      {/* Mobile: Infinite scroll trigger - Always render to ensure ref is attached */}
      <div ref={intersectionRef} className='lg:hidden h-10'>
        {/* {isMobile && hasNextPage && !isCategorySwitching ? (
          <p className='text-light-blue'>Scroll for more</p>
        ) : (
          <div className='h-10' />
        )} */}
      </div>

      {/* Desktop: Load More button */}
      {!isMobile && hasNextPage && !isCategorySwitching && (
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
      {/* {!hasNextPage && allPosts.length > 0 && !isCategorySwitching && (
        <div className='mt-12 flex justify-center'>
          <p className='text-light-blue'>You've reached the end of the posts</p>
        </div>
      )} */}
    </section>
  );
};

export default PostsGrid;
