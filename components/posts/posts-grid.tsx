'use client';

import { useRef, useEffect } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'motion/react';
import SectionHeader from '../ui/section-header/section-header';
import PostCard from './post-card';
import PostsFilters from './posts-filters';
import { Button } from '../ui/button';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { fetchFilteredPosts } from '@/app/actions/posts';
import { CategoryWithChildren, cn } from '@/lib/utils';
import PostSkeleton from './post-card-skeleton';
import { FilterOption } from '../ui/filter-buttons';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import GenericSidebar from '../ui/generic-sidebar';
import { transformCategoriesData } from '@/lib/utils/sidebar-transformers';

interface PostsGridProps {
  heading: string;
  categorySlug?: string;
  initialPosts: POSTS_BY_CATEGORY_QUERYResult['posts'];
  categoryTree?: CategoryWithChildren;
  filterOptions: FilterOption[]; // These are the YEAR filters
  latestYear?: string;
  className?: string;
}

const PostsGrid = ({
  heading,
  categorySlug = 'all',
  initialPosts,
  categoryTree,
  filterOptions,
  latestYear,
  className,
}: PostsGridProps) => {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault(categorySlug || 'all')
  );
  const [year, setYear] = useQueryState(
    'year',
    parseAsString.withDefault(latestYear || 'all')
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
    queryKey: ['posts', category, year],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await fetchFilteredPosts({
        categorySlug: category,
        year: year,
        page: pageParam,
      });

      if (!result?.data?.success) {
        throw new Error(result?.data?.error || 'Failed to fetch posts');
      }

      return result.data.data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 0,
    initialData: () => {
      const isDefaultFilterState =
        category === 'all' && year === (latestYear || 'all');
      if (isDefaultFilterState) {
        return {
          pages: [
            {
              posts: initialPosts,
              nextPage: initialPosts.length >= 9 ? 1 : null,
              totalCount: initialPosts.length,
              hasNextPage: initialPosts.length >= 9,
            },
          ],
          pageParams: [0],
        };
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
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

  let sectionsLocal, mobileTitleLocal;
  if (categoryTree) {
    const { sections, mobileTitle } = transformCategoriesData(categoryTree);
    sectionsLocal = sections;
    mobileTitleLocal = mobileTitle;
  }

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
        <div
          className={cn(
            'mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 2xl:gap-10'
          )}
        >
          {categoryTree &&
            (() => {
              // const { sections, mobileTitle } =
              //   transformCategoriesData(categoryTree);
              return (
                <GenericSidebar
                  sections={sectionsLocal!}
                  mobileTitle={mobileTitleLocal!}
                  className='col-span-full xl:col-span-4 xl:max-w-8/10 bg-white xl:sticky xl:top-28'
                  mobileOnly={isMobile}
                  forPosts={true}
                />
              );
            })()}

          <section
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-9',
              categoryTree
                ? 'col-span-full xl:col-span-8 xl:grid-cols-2'
                : 'col-span-full xl:grid-cols-3'
            )}
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <PostSkeleton key={`skeleton-${index}`} className='col-span-1' />
            ))}
          </section>
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
            activeCategory={latestYear ? year : category}
            onCategoryChange={latestYear ? setYear : setCategory}
            variant='dark'
          />
        }
      />

      <div
        id='blogGrid'
        className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 2xl:gap-10'
      >
        {/* Category Navigation */}
        {categoryTree &&
          (() => {
            return (
              <GenericSidebar
                sections={sectionsLocal!}
                mobileTitle={mobileTitleLocal!}
                className='col-span-full xl:col-span-4 xl:max-w-8/10 bg-white xl:sticky xl:top-28'
                mobileOnly={isMobile}
                forPosts={true}
              />
            );
          })()}

        {/* Posts Grid */}
        <section
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-9',
            categoryTree
              ? 'col-span-full xl:col-span-8 xl:grid-cols-2'
              : 'col-span-full xl:grid-cols-3'
          )}
        >
          {isCategorySwitching
            ? Array.from({ length: 9 }).map((_, index) => (
                <PostSkeleton key={`skeleton-${index}`} />
              ))
            : allPosts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
        </section>

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
      </div>
    </section>
  );
};

export default PostsGrid;
