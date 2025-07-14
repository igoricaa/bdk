'use client';

import { useState, useRef, RefObject } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Input } from '@/src/components/ui/input';
import { TransitionLink } from '@/src/components/transition-link';
import {
  FileText,
  User,
  Building,
  Briefcase,
  Globe,
  Loader2,
  SearchIcon,
  XIcon,
  Search,
} from 'lucide-react';
import { useOnClickOutside } from '@/src/lib/hooks/use-on-click-outside';
import { cn } from '@/src/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export type SearchResult = {
  _id: string;
  _type: 'post' | 'lawyer' | 'industry' | 'practice' | 'foreignDesk';
  title: string;
  slug: string;
  details?: string;
};

const fetchSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  const response = await fetch(`/api/search/all?q=${query}`);
  if (!response.ok) {
    throw new Error('Search request failed');
  }
  return response.json();
};

export const MainSearch = ({
  className,
  inputFieldClassName,
}: {
  className?: string;
  inputFieldClassName?: string;
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const [isActive, setIsActive] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef as RefObject<HTMLElement>, () =>
    setIsFocused(false)
  );

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery<SearchResult[]>({
    queryKey: ['globalSearch', debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  const showDropdown = isFocused && query.length > 0;

  return (
    <div className={cn('relative w-full max-w-md', className)} ref={searchRef}>
      <button
        className={cn(
          'bg-transparent border border-grey-random rounded-full md:min-w-9 md:min-h-9 md:size-9 xl:min-w-8 xl:min-h-8 xl:size-8 flex items-center justify-center cursor-pointer'
        )}
        onClick={() => setIsActive(true)}
      >
        <Search
          className='w-4 h-4 md:w-5 md:h-5 2xl:w-4.5 2xl:h-4.5'
          strokeWidth={1}
          stroke='hsl(var(--grey-random))'
        />
      </button>

      <AnimatePresence mode='wait'>
        {isActive && (
          <>
            <motion.div
              key='backdrop'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className='fixed w-screen h-[calc(100vh-5rem)] top-20 left-0 bg-light-blue-bg/75 backdrop-blur-lg z-10'
              onClick={() => setIsActive(false)}
            ></motion.div>
            <motion.div
              key='search-container'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className='fixed top-48 left-1/2 -translate-x-1/2 w-4xl z-120'
            >
              <motion.div
                key='search-input'
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='w-full h-16.5'
              >
                {query ? (
                  <XIcon
                    className='w-4 h-4 2xl:w-5 2xl:h-5 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2 cursor-pointer'
                    strokeWidth={1}
                    stroke='hsl(var(--grey-text))'
                    onClick={() => setQuery('')}
                  />
                ) : (
                  <div
                    className={cn(
                      'bg-transparent border border-grey-random rounded-full md:min-w-9 md:min-h-9 md:size-9 xl:min-w-8 xl:min-h-8 xl:size-8 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center'
                    )}
                    onClick={() => setIsActive(true)}
                  >
                    <Search
                      className='w-4 h-4 md:w-5 md:h-5 2xl:w-4.5 2xl:h-4.5'
                      strokeWidth={1}
                      stroke='hsl(var(--grey-random))'
                    />
                  </div>
                )}
                <Input
                  placeholder='Search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className={cn(
                    'w-full rounded-[500px] flex items-center gap-16 justify-between bg-white border-none focus-visible:border-none! focus-visible:ring-0! outline-none shadow-none h-full pl-6 pr-12 2xl:pl-8 2xl:pr-14 text-dark-blue md:text-sm 2xl:text-2xl',
                    inputFieldClassName
                  )}
                />
              </motion.div>

              {showDropdown && (
                <SearchResultsDropdown
                  results={results || []}
                  isLoading={isLoading}
                  isError={isError}
                  onClose={() => setIsFocused(false)}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const resultMeta = {
  post: {
    icon: <FileText className='h-5 w-5 text-gray-500' />,
    path: '',
  },
  lawyer: {
    icon: <User className='h-5 w-5 text-gray-500' />,
    path: '/people',
  },
  industry: {
    icon: <Building className='h-5 w-5 text-gray-500' />,
    path: '/industries',
  },
  practice: {
    icon: <Briefcase className='h-5 w-5 text-gray-500' />,
    path: '/practices',
  },
  foreignDesk: {
    icon: <Globe className='h-5 w-5 text-gray-500' />,
    path: '/foreign-desks',
  },
};

const SearchResultItem = ({
  result,
  onClose,
}: {
  result: SearchResult;
  onClose: () => void;
}) => {
  const meta = resultMeta[result._type];
  const href = `${meta.path}/${result.slug}`;

  return (
    <TransitionLink
      href={href}
      onClick={onClose}
      pageName={result.details || result.title}
      className='flex items-center gap-4 p-3.5 rounded-md transition-colors border-b border-lightest-blue'
    >
      <span className='text-2xl text-dark-blue'>
        {result.details && `${result.details} - `}
        {result.title}
      </span>
    </TransitionLink>
  );
};

const SearchResultsDropdown = ({
  results,
  isLoading,
  isError,
  onClose,
}: {
  results: SearchResult[];
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='absolute top-[calc(100%+0.25rem)] w-full bg-white rounded-2xl pt-9 px-6 pb-5'
    >
      {isLoading && (
        <div className='flex items-center justify-center p-4'>
          <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
        </div>
      )}
      {isError && (
        <p className='p-4 text-center text-sm text-red-500'>
          Something went wrong. Please try again.
        </p>
      )}
      {!isLoading && !isError && results.length === 0 && (
        <p className='p-4 text-center text-sm text-gray-500'>
          No results found.
        </p>
      )}
      {!isLoading && !isError && results.length > 0 && (
        <div className='flex flex-col'>
          {results.map((result) => (
            <SearchResultItem
              key={result._id}
              result={result}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
