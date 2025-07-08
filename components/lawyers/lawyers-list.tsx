'use client';

import { HOME_PAGE_QUERYResult, Lawyer } from '@/sanity.types';
import LawyerCard from './lawyers-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';
import { FilterOption } from '../ui/filter-buttons';
import LawyersNavbar from './lawyers-navbar';
import { useState } from 'react';

const LawyersList = ({
  lawyersByCategory,
  lawyersFilterOptions,
  gridLimit = 6,
  className,
  listClassName,
}: {
  lawyersByCategory: Record<
    string,
    { lawyers: HOME_PAGE_QUERYResult['lawyers'] }
  >;
  lawyersFilterOptions: FilterOption[];
  gridLimit?: number;
  className?: string;
  listClassName?: string;
}) => {
  const isMobile = useIsMobile({ breakpoint: 1024 });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredLawyers = lawyersByCategory[activeCategory]?.lawyers || [];

  return (
    <div className={className}>
      <LawyersNavbar
        categories={lawyersFilterOptions}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {isMobile ? (
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
            listClassName
          )}
        >
          {filteredLawyers.slice(0, gridLimit).map((lawyer, index) => (
            <LawyerCard
              key={`${lawyer.slug.current}-${index}`}
              lawyer={lawyer as unknown as Lawyer}
            />
          ))}
        </div>
      ) : (
        <LawyersCarousel
          lawyers={filteredLawyers as unknown as Lawyer[]}
          className={listClassName}
        />
      )}
    </div>
  );
};

export default LawyersList;
