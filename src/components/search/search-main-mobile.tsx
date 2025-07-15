'use client';

import { useState, useRef, RefObject, useMemo, useEffect } from 'react';
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
  XIcon,
  Search,
} from 'lucide-react';
import { useOnClickOutside } from '@/src/lib/hooks/use-on-click-outside';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import BackToButton from '../ui/buttons/back-to-button';

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

export const MainSearchMobile = ({
  toggleMenu,
  backButtonClick,
  menuRef,
}: {
  toggleMenu: () => void;
  backButtonClick: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const [isActive, setIsActive] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef as RefObject<HTMLElement>, () =>
    setIsFocused(false)
  );

  useEffect(() => {
    const body = document.body as HTMLElement;
    body.style.overflow = isActive ? 'hidden' : '';

    if (isActive) {
      body.setAttribute('data-lenis-prevent', 'true');
    } else {
      body.removeAttribute('data-lenis-prevent');
    }
  }, [isActive]);

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
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='h-[calc(100vh-60px)] w-screen px-side pt-8 flex flex-col bg-dark-blue fixed top-15 left-0 z-105 overflow-y-auto overflow-x-hidden transform'
    >
      <BackToButton
        onClick={backButtonClick}
        text='Back to Main Menu'
        iconClassName='bg-transparent border border-light-blue w-10 h-10'
        iconStrokeColor='hsl(var(--light-blue))'
        className='text-light-blue'
      />

      <motion.div
        key='search-input'
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='w-full h-14 xl:h-16.5 mt-7 relative'
      >
        {query ? (
          <XIcon
            className='md:min-w-7 min-h-7 md:size-7 xl:min-w-8 xl:min-h-8 xl:size-8 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2 cursor-pointer'
            strokeWidth={1}
            stroke='hsl(var(--grey-text))'
            onClick={() => setQuery('')}
          />
        ) : (
          <div
            className={cn(
              'bg-transparent border border-lightest-blue rounded-full min-w-10 min-h-10 size-10 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center'
            )}
            onClick={() => setIsActive(true)}
          >
            <Search
              className='w-4.5 h-4.5'
              strokeWidth={1}
              stroke='hsl(var(--lightest-blue))'
            />
          </div>
        )}
        <Input
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={cn(
            'w-full rounded-[500px] flex items-center gap-16 justify-between bg-white border-none focus-visible:border-none! focus-visible:ring-0! outline-none shadow-none h-full pl-6 pr-12 text-xl text-dark-blue placeholder:text-dark-blue'
          )}
        />
      </motion.div>

      {showDropdown && (
        <SearchResultsDropdown
          results={results || []}
          isLoading={isLoading}
          isError={isError}
          onClose={() => {
            setIsFocused(false);
            setTimeout(() => {  
              toggleMenu();
            }, 1000);
          }}
        />
      )}
    </motion.div>
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
      className='flex items-center gap-4 px-2 xl:px-2.5 py-2.5 xl:py-3.5 transition-colors border-b border-lightest-blue group hover:bg-light-blue-bg hover:border-light-blue-bg hover:rounded-[10px]'
    >
      <span className='text-xl xl:text-2xl text-dark-blue group-hover:text-light-blue'>
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
  const groupedResults = useMemo(() => {
    if (!results) return {};

    const initialGroups: { [key: string]: SearchResult[] } = {
      People: [],
      Posts: [],
      Services: [],
    };

    const groups = results.reduce((acc, result) => {
      switch (result._type) {
        case 'lawyer':
          acc.People.push(result);
          break;
        case 'industry':
        case 'practice':
        case 'foreignDesk':
          acc.Services.push(result);
          break;
        case 'post':
          acc.Posts.push(result);
          break;
        default:
          break;
      }
      return acc;
    }, initialGroups);

    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }, [results]);

  const hasResults = Object.keys(groupedResults).length > 0;

  const groupOrder = ['People', 'Services', 'Posts'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='mt-6 w-full bg-white rounded-2xl pt-9 px-2.5 pb-6 max-h-[70vh] overflow-y-auto'
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
      {!isLoading && !isError && !hasResults && (
        <p className='px-4 pb-4 text-center text-lg text-gray-500'>
          No results found.
        </p>
      )}
      {!isLoading && !isError && hasResults && (
        <div className='flex flex-col'>
          {Object.entries(groupedResults)
            .sort(([a], [b]) => groupOrder.indexOf(a) - groupOrder.indexOf(b))
            .map(([groupTitle, items], index) => (
              <div key={groupTitle}>
                <h3
                  className={cn(
                    'text-lg text-grey-random mb-2 px-2.5 pt-9 pb-3.5  border-b border-lightest-blue',
                    index === 0 && 'pt-0'
                  )}
                >
                  {groupTitle}
                </h3>
                <div className='flex flex-col'>
                  {items.map((result) => (
                    <SearchResultItem
                      key={result._id}
                      result={result}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </motion.div>
  );
};
