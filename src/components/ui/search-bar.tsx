'use client';

import { useDebouncedCallback } from 'use-debounce';
import { Input } from './input';
import { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SearchBar = ({
  onSearchChange,
  className,
  inputClassName,
}: {
  onSearchChange: (query: string) => void;
  className?: string;
  inputClassName?: string;
}) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedOnSearchChange = useDebouncedCallback((value: string) => {
    onSearchChange(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedOnSearchChange(value);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        type='text'
        placeholder='Search'
        value={inputValue}
        onChange={handleChange}
        className={cn(
          'w-full rounded-[500px] flex items-center gap-16 justify-between bg-lightest-blue/25! border-none focus-visible:border-none! focus-visible:ring-0! outline-none shadow-none h-12.5 md:h-7.5 2xl:h-10 pl-6 pr-12 text-grey-text md:text-sm',
          inputClassName
        )}
      />
      {inputValue ? (
        <XIcon
          className='w-4 h-4 2xl:w-5 2xl:h-5 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2 cursor-pointer'
          strokeWidth={1}
          stroke='hsl(var(--grey-text))'
          onClick={() => handleChange({ target: { value: '' } } as any)}
        />
      ) : (
        <SearchIcon
          className='w-4 h-4 2xl:w-5 2xl:h-5 absolute right-[calc(var(--padding-side)+1.5rem)] md:right-6 top-1/2 -translate-y-1/2'
          strokeWidth={1}
          stroke='hsl(var(--grey-text))'
        />
      )}
    </div>
  );
};

export default SearchBar;
