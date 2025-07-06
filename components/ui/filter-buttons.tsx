'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterButtonsProps {
  options: FilterOption[];
  activeOption: string;
  onOptionChange: (optionId: string) => void;
  variant?: 'dark' | 'light';
  className?: string;
  showAllOption?: {
    label: string;
    count: number;
  };
  minOptionsToShow?: number;
}

export default function FilterButtons({
  options,
  activeOption,
  onOptionChange,
  variant = 'light',
  className,
  showAllOption,
  minOptionsToShow = 1,
}: FilterButtonsProps) {
  const availableOptions = options.filter((option) => option.count > 0);

  if (availableOptions.length <= minOptionsToShow) {
    return null;
  }

  const allOptions = showAllOption
    ? [
        { id: 'all', label: showAllOption.label, count: showAllOption.count },
        ...availableOptions,
      ]
    : availableOptions;

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles =
      'transition-all duration-200 text-sm rounded-full h-7.5 px-4 2xl:h-10 2xl:px-6 cursor-pointer';

    if (variant === 'dark') {
      return cn(
        baseStyles,
        'text-white',
        isActive
          ? 'bg-light-blue hover:bg-light-blue/80'
          : 'bg-transparent hover:bg-light-blue border border-light-blue text-light-blue hover:text-white'
      );
    }

    // Light variant (original styling)
    return cn(
      baseStyles,
      'text-white',
      isActive
        ? 'bg-light-blue hover:bg-light-blue/80'
        : 'bg-white/10 hover:bg-white/20'
    );
  };

  return (
    <div className={cn('flex gap-1 2xl:gap-2.5', className)}>
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
