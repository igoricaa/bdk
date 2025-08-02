import { cn } from '@/src/lib/utils';

interface NoResultsMessageProps {
  hasSearchTerm: boolean;
  hasActiveFilters: boolean;
  className?: string;
}

const NoResultsMessage = ({
  hasSearchTerm,
  hasActiveFilters,
  className,
}: NoResultsMessageProps) => {
  const getMessage = () => {
    if (hasSearchTerm && hasActiveFilters) {
      return 'No posts found matching your search and selected filters.';
    }
    if (hasSearchTerm) {
      return 'No posts found matching your search.';
    }
    if (hasActiveFilters) {
      return 'No posts found for the selected criteria.';
    }
    return 'No posts available.';
  };

  return (
    <div
      className={cn(
        'px-4 pb-4 text-center text-lg text-gray-500 col-span-full py-12',
        className
      )}
    >
      <p>{getMessage()}</p>
    </div>
  );
};

export default NoResultsMessage;