'use client';

import PostCard from '../posts/post-card';
import { cn } from '@/src/lib/utils';
import { useIsMobile } from '@/src/lib/hooks/use-mobile';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFilteredPosts } from '@/src/app/actions/posts';
import FilterButtons, { FilterOption } from '../ui/filter-buttons';
import PostCardSkeleton from '../posts/post-card-skeleton';
import { UNIVERSAL_AUTHOR_PAGE_QUERYResult } from '@/sanity.types';
import UnderlinedButton from '../ui/buttons/underlined-button';

const categoryFilterOptions: FilterOption[] = [
  { slug: 'all', label: 'All' },
  { slug: 'blog', label: 'Blog' },
  { slug: 'digital-watch', label: 'Digital Watch' },
  { slug: 'insights', label: 'Insights' },
  { slug: 'publications', label: 'Publications' },
];

const AuthorPostsSection = ({
  authorId,
  posts,
  className,
  isLawyer,
}: {
  authorId: string;
  posts: NonNullable<UNIVERSAL_AUTHOR_PAGE_QUERYResult>['posts'];
  className?: string;
  isLawyer: boolean;
}) => {
  const [category, setCategory] = useState('all');
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
    queryKey: ['posts', category, authorId],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await fetchFilteredPosts({
        categorySlug: category,
        authorId: authorId,
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
      const isDefaultFilterState = category === 'all';
      if (isDefaultFilterState) {
        return {
          pages: [
            {
              posts: posts,
              nextPage: posts.length >= 9 ? 1 : null,
              totalCount: posts.length,
              hasNextPage: posts.length >= 9,
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
  const isInitialLoading = isLoading && !data;
  const isFiltering = isFetching && !isFetchingNextPage && !isInitialLoading;

  if (isError) {
    return (
      <section className={cn('', className)}>
        <div className='flex items-center justify-between'>
          <h2
            className={cn(
              'pl-side text-dark-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl',
              isLawyer ? 'xl:pl-0' : 'lg:pl-0'
            )}
          >
            Posts
          </h2>
          <FilterButtons
            options={categoryFilterOptions}
            activeOption={category}
            onOptionChange={setCategory}
            variant='dark'
            className='w-full pl-side md:pl-0 lg:w-fit'
          />
        </div>
        <div className='mt-12 sm:mt-5 xl:mt-11 2xl:mt-20 flex justify-center text-red-500'>
          Error: {error?.message || 'Failed to load posts'}
        </div>
      </section>
    );
  }

  return (
    <section className={cn('', className)}>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <h2
          className={cn(
            'pl-side text-dark-blue text-3xl xl:text-4xl 2xl:text-5xl',
            isLawyer ? 'xl:pl-0' : 'lg:pl-0'
          )}
        >
          Posts
        </h2>
        <FilterButtons
          options={categoryFilterOptions}
          activeOption={category}
          onOptionChange={setCategory}
          variant='dark'
          className={cn(
            'w-full pl-side md:pl-0 md:pr-side md:w-fit',
            isLawyer ? 'xl:pl-0' : 'lg:pl-0 lg:pr-0'
          )}
        />
      </div>

      <ul
        className={cn(
          'px-side  grid auto-rows-max grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:gap-8 2xl:gap-10 mt-6 md:mt-8 xl:mt-10 2xl:mt-15',
          isLawyer
            ? 'xl:pl-0'
            : 'lg:pl-0 lg:pr-0 lg:grid-cols-3 2xl:grid-cols-4'
        )}
      >
        {isFiltering
          ? Array.from({ length: posts.length > 10 ? 10 : posts.length }).map(
              (_, index) => <PostCardSkeleton key={`skeleton-${index}`} />
            )
          : allPosts.map((post) => (
              <li key={post._id}>
                <PostCard post={post} className='aspect-auto! h-full' />
              </li>
            ))}
      </ul>

      <div className='px-side col-span-full mt-12 flex justify-center'>
        {isFetchingNextPage ? (
          <p className='text-light-blue'>Loading more posts...</p>
        ) : !isMobile && hasNextPage && !isFiltering ? (
          <UnderlinedButton
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            Load More
          </UnderlinedButton>
        ) : null}
      </div>
      <div ref={intersectionRef} className='col-span-full lg:hidden h-10' />
    </section>
  );
};

export default AuthorPostsSection;
