'use client';

import { useState, useRef, RefObject } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { TransitionLink } from '@/components/transition-link';
import {
  FileText,
  User,
  Building,
  Briefcase,
  Globe,
  Loader2,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { useOnClickOutside } from '@/lib/hooks/use-on-click-outside';

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

export const MainSearch = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300); // 300ms debounce delay

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
    <div className='relative w-full max-w-md' ref={searchRef}>
      <div className='relative'>
        {query ? (
          <XIcon
            className='w-4 h-4 2xl:w-5 2xl:h-5 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2 cursor-pointer'
            strokeWidth={1}
            stroke='hsl(var(--grey-text))'
            onClick={() => setQuery('')}
          />
        ) : (
          <SearchIcon
            className='w-4 h-4 2xl:w-5 2xl:h-5 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2'
            strokeWidth={1}
            stroke='hsl(var(--grey-text))'
          />
        )}
        <Input
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className='w-full rounded-[500px] flex items-center gap-16 justify-between bg-lightest-blue/25! border-none focus-visible:border-none! focus-visible:ring-0! outline-none shadow-none h-12.5 md:h-7.5 2xl:h-10 pl-6 pr-12 text-grey-text md:text-sm'
        />
      </div>
      {showDropdown && (
        <SearchResultsDropdown
          results={results || []}
          isLoading={isLoading}
          isError={isError}
          onClose={() => setIsFocused(false)}
        />
      )}
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
      className='flex items-center gap-4 p-3 hover:bg-gray-100 rounded-md transition-colors'
    >
      {meta.icon}
      <span className='text-sm text-gray-800'>
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
    <div className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2'>
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
    </div>
  );
};
