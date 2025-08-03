'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'motion/react';
import SectionHeader from '../ui/section-header/section-header';
import PostCard from './post-card';
import { useIsMobile } from '@/src/lib/hooks/use-mobile';
import { fetchFilteredPosts } from '@/src/app/actions/posts';
import { CategoryWithChildren, cn } from '@/src/lib/utils';
import PostSkeleton from './post-card-skeleton';
import FilterButtons, { FilterOption } from '../ui/filter-buttons';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import GenericSidebar from '../ui/generic-sidebar';
import { transformCategoriesData } from '@/src/lib/utils/sidebar-transformers';
import SearchBar from '../ui/search-bar';
import UnderlinedButton from '../ui/buttons/underlined-button';

import { normalizeString } from '@/src/lib/utils/normalize-string';
import {
  useAvailableCategoriesForYear,
  useAvailableYearsForCategory,
} from '@/src/hooks/use-filter-availability';
import { filterCategoryTree } from '@/src/lib/utils/category-tree-helpers';
import FilterButtonsSkeleton from '@/src/components/ui/filter-buttons-skeleton';
import SidebarCategorySkeleton from '@/src/components/ui/sidebar-category-skeleton';
import NoResultsMessage from './no-results-message';

interface PostsGridProps {
  heading: string;
  initialPosts: POSTS_BY_CATEGORY_QUERYResult['posts'];
  className?: string;
  showSidebar?: boolean;
  categoryTree?: CategoryWithChildren;
  yearFilterOptions?: FilterOption[];
  categoryFilterOptions?: FilterOption[];
  initialCategory?: string;
  initialYear?: string;
}

const PostsGrid = ({
  heading,
  initialPosts,
  className,
  showSidebar = false,
  categoryTree,
  yearFilterOptions,
  categoryFilterOptions,
  initialCategory = 'all',
  initialYear = 'all',
}: PostsGridProps) => {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault(initialCategory || 'all')
  );
  const [year, setYear] = useQueryState(
    'year',
    parseAsString.withDefault(initialYear || 'all')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileAccordionValue, setMobileAccordionValue] = useState<string>('');

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
        category === initialCategory && year === initialYear;
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

  // Close mobile accordion when category changes
  useEffect(() => {
    if (isMobile && category !== initialCategory) {
      setMobileAccordionValue('');
    }
  }, [category, isMobile, initialCategory]);

  const handleLoadMore = () => {
    if (!isMobile && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];
  const isInitialLoading = isLoading && !data;
  const isFiltering = isFetching && !isFetchingNextPage && !isInitialLoading;

  // React Query hooks for availability checking
  const { data: availableCategorySlugs, isLoading: isLoadingCategories } =
    useAvailableCategoriesForYear(year);

  const { data: availableYears, isLoading: isLoadingYears } =
    useAvailableYearsForCategory(category);

  // Filter category tree based on available categories
  const filteredCategoryTree =
    categoryTree && year !== 'all' && availableCategorySlugs
      ? filterCategoryTree(categoryTree, availableCategorySlugs)
      : categoryTree;

  // Filter year options based on available years
  const filteredYearOptions =
    yearFilterOptions && category !== 'all' && availableYears
      ? yearFilterOptions.filter(
          (option) =>
            option.slug === 'all' || availableYears.includes(option.slug)
        )
      : yearFilterOptions;

  const sidebarData =
    showSidebar && filteredCategoryTree
      ? transformCategoriesData(filteredCategoryTree)
      : null;

  const displayedPosts = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      return allPosts;
    }

    const normalizedSearchTerm = normalizeString(searchTerm);
    return allPosts.filter(
      (post) =>
        normalizeString(post.title).includes(normalizedSearchTerm) ||
        normalizeString(post.authors[0].name).includes(normalizedSearchTerm)
    );
  }, [category, year, searchTerm, allPosts]);

  const activeFilters = filteredYearOptions ? (
    <>
      {isLoadingYears && category !== 'all' ? (
        <FilterButtonsSkeleton
          variant='dark'
          className='w-full pl-side md:pl-0 lg:w-fit'
          count={3}
        />
      ) : (
        <FilterButtons
          options={filteredYearOptions}
          activeOption={year}
          onOptionChange={setYear}
          variant='dark'
          className='w-full pl-side md:pl-0 lg:w-fit'
        />
      )}
    </>
  ) : categoryFilterOptions ? (
    <FilterButtons
      options={categoryFilterOptions}
      activeOption={category}
      onOptionChange={setCategory}
      variant='dark'
      className='w-full pl-side md:pl-0 lg:w-fit'
    />
  ) : null;

  const filterAndSearchComponent = (
    <div className='flex flex-col md:flex-row xl:flex-row-reverse items-center gap-4 md:gap-2.5 md:justify-between xl:justify-end lg:px-side lg:w-full xl:px-0 overflow-hidden'>
      <SearchBar
        onSearchChange={setSearchTerm}
        className='px-side md:pr-0 lg:px-0 lg:w-fit'
        inputClassName='bg-white! md:max-w-[calc((100vw-2*var(--padding-side)-24px)/2)] flex-shrink-1 h-10'
      />
      {activeFilters}
    </div>
  );

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, index) => (
      <PostSkeleton key={index} className='col-span-1' />
    ));

  const sectionSharedClasses = cn(
    'pt-16 pb-25 sm:pt-25 sm:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
    className
  );

  if (isInitialLoading) {
    return (
      <section className={sectionSharedClasses}>
        <SectionHeader
          heading={heading}
          colorVariant='dark'
          headingClassName='pl-side'
        />
        <div className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 2xl:gap-10'>
          {showSidebar && (
            <>
              {isLoadingCategories && year !== 'all' ? (
                <div className='col-span-full xl:col-span-4 xl:max-w-8/10 rounded-[10px] bg-white z-20 xl:sticky xl:top-28 px-4 py-6'>
                  <SidebarCategorySkeleton forPosts={true} />
                </div>
              ) : sidebarData ? (
                <GenericSidebar
                  sections={sidebarData.sections}
                  mobileTitle={sidebarData.mobileTitle}
                  className='col-span-full xl:col-span-4 xl:max-w-8/10 rounded-[10px] bg-white z-20 xl:sticky xl:top-28 px-4'
                  mobileOnly={isMobile}
                  forPosts={true}
                  accordionValue={isMobile ? mobileAccordionValue : undefined}
                  onAccordionValueChange={
                    isMobile ? setMobileAccordionValue : undefined
                  }
                />
              ) : null}
            </>
          )}
          <section
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-9',
              showSidebar
                ? 'col-span-full xl:col-span-8 xl:grid-cols-2'
                : 'col-span-full xl:grid-cols-3 px-side'
            )}
          >
            {renderSkeletons(9)}
          </section>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={sectionSharedClasses}>
        <SectionHeader
          heading={heading}
          colorVariant='dark'
          headingClassName='pl-side'
        />
        <div className='px-side mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 flex justify-center text-red-500'>
          Error: {error?.message || 'Failed to load posts'}
        </div>
      </section>
    );
  }

  return (
    <section className={sectionSharedClasses}>
      <SectionHeader
        heading={heading}
        colorVariant='dark'
        className='md:flex-col md:items-start! xl:flex-row xl:items-center! xl:justify-between'
        headingClassName='pl-side'
        rightSideComponent={filterAndSearchComponent}
        rightSideComponentClassName='w-full xl:w-fit xl:pr-side'
      />

      <div
        id='blogGrid'
        className={cn(
          'mt-4 sm:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 2xl:gap-10 px-side'
        )}
      >
        {showSidebar && (
          <>
            {isLoadingCategories && year !== 'all' ? (
              <div className='col-span-full xl:col-span-4 xl:max-w-8/10 rounded-[10px] bg-white z-20 xl:sticky xl:top-28 px-4 py-6 h-fit'>
                <SidebarCategorySkeleton forPosts={true} />
              </div>
            ) : sidebarData ? (
              <GenericSidebar
                sections={sidebarData.sections}
                mobileTitle={sidebarData.mobileTitle}
                className='col-span-full xl:col-span-4 xl:max-w-8/10 rounded-[10px] bg-white z-20 xl:sticky xl:top-28 px-4'
                mobileOnly={isMobile}
                forPosts={true}
                accordionValue={isMobile ? mobileAccordionValue : undefined}
                onAccordionValueChange={
                  isMobile ? setMobileAccordionValue : undefined
                }
              />
            ) : null}
          </>
        )}

        {/* Posts Grid */}
        <section
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-9',
            showSidebar
              ? 'col-span-full xl:col-span-8 xl:grid-cols-2'
              : 'col-span-full xl:grid-cols-3'
          )}
        >
          {isFiltering ? (
            renderSkeletons(9)
          ) : displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <NoResultsMessage
              hasSearchTerm={searchTerm.trim() !== ''}
              hasActiveFilters={
                category !== initialCategory || year !== initialYear
              }
            />
          )}
        </section>

        <div className='col-span-full mt-12 flex justify-center'>
          {isFetchingNextPage ? (
            <p className='text-light-blue'>Loading more posts...</p>
          ) : !isMobile &&
            hasNextPage &&
            !isFiltering &&
            displayedPosts.length > 0 ? (
            <UnderlinedButton
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
            >
              Load More
            </UnderlinedButton>
          ) : null}
        </div>

        <div ref={intersectionRef} className='col-span-full lg:hidden h-10' />
      </div>
    </section>
  );
};

export default PostsGrid;
