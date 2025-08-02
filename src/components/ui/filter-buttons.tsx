'use client';

import { Button } from '@/src/components/ui/button';
import { useIsMobile } from '@/src/lib/hooks/use-mobile';
import { cn } from '@/src/lib/utils';
import FiltersCarousel from './filters/filters-carousel';

export interface FilterOption {
  slug: string;
  label: string;
}

interface FilterButtonsProps {
  options: FilterOption[];
  activeOption: string;
  onOptionChange: (optionId: string) => void;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function FilterButtons({
  options,
  activeOption,
  onOptionChange,
  variant = 'light',
  className,
}: FilterButtonsProps) {
  const isMobile = useIsMobile({ breakpoint: 1024 });
  if (options.length === 0) {
    return null;
  }

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles =
      'transition-all duration-200 text-sm rounded-full h-7.5 px-4 2xl:h-10 2xl:px-6 cursor-pointer text-white';

    if (variant === 'dark') {
      return cn(
        baseStyles,
        'border border-light-blue',
        isActive
          ? 'bg-light-blue hover:bg-light-blue/80'
          : 'bg-transparent text-light-blue hover:bg-light-blue hover:text-white'
      );
    }

    return cn(
      baseStyles,
      isActive
        ? 'bg-light-blue hover:bg-light-blue/80'
        : 'bg-white/10 hover:bg-white/20'
    );
  };

  return (
    <div
      className={cn(
        'overflow-x-scroll no-scrollbar',
        !isMobile && options.length > 5 ? '' : 'flex gap-1 2xl:gap-2.5',
        className
      )}
    >
      {!isMobile && options.length > 5 ? (
        <FiltersCarousel
          options={options}
          activeOption={activeOption}
          onOptionChange={onOptionChange}
          getButtonStyles={getButtonStyles}
        />
      ) : (
        options.map((option) => (
          <Button
            key={option.slug}
            size='sm'
            onClick={() => onOptionChange(option.slug)}
            className={getButtonStyles(activeOption === option.slug)}
          >
            {option.label}
          </Button>
        ))
      )}
    </div>
  );
}
