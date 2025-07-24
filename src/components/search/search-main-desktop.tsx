'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const DynamicSearchModal = dynamic(
  () => import('./search-modal').then((mod) => mod.SearchModal),
  { ssr: false }
);

export const MainSearchDesktop = ({
  className,
  inputFieldClassName,
}: {
  className?: string;
  inputFieldClassName?: string;
}) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className={cn(className)}>
      <button
        className={cn(
          'bg-transparent border border-grey-random rounded-full md:min-w-9 md:min-h-9 md:size-9 xl:min-w-8 xl:min-h-8 xl:size-8 flex items-center justify-center cursor-pointer'
        )}
        onClick={() => setIsModalActive(true)}
        aria-label='Open Search'
      >
        <Search
          className='w-4 h-4 md:w-5 md:h-5 2xl:w-4.5 2xl:h-4.5'
          strokeWidth={1}
          stroke='hsl(var(--grey-random))'
        />
      </button>

      {isModalActive && (
        <DynamicSearchModal
          onClose={() => setIsModalActive(false)}
          inputFieldClassName={inputFieldClassName}
        />
      )}
    </div>
  );
};
