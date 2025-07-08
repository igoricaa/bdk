import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'rounded-[500px] flex items-center gap-16 justify-between bg-lightest-blue/25 h-12.5 md:h-7.5 2xl:h-10 px-6',
        className
      )}
    >
      <span className='text-grey-text md:text-sm'>Search</span>
      <SearchIcon
        className='w-4 h-4'
        strokeWidth={1}
        stroke='hsl(var(--grey-text))'
      />
    </div>
  );
};

export default SearchBar;
