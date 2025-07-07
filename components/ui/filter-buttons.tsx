'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterButtonsProps {
  options: FilterOption[];
  activeOption: string;
  onOptionChange: (optionId: string) => void;
  variant?: 'dark' | 'light';
  className?: string;
  showAllOption?: boolean;
}

export default function FilterButtons({
  options,
  activeOption,
  onOptionChange,
  variant = 'light',
  className,
  showAllOption = true,
}: FilterButtonsProps) {
  if (options.length <= 1) {
    return null;
  }

  const allOptions = showAllOption
    ? [{ id: 'all', label: 'All' }, ...options]
    : options;

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
    <div className={cn('overflow-x-scroll flex gap-1 2xl:gap-2.5', className)}>
      {allOptions.map((option) => (
        <Button
          key={option.id}
          size='sm'
          onClick={() => onOptionChange(option.id)}
          className={getButtonStyles(activeOption === option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
