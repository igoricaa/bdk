'use client';

import LawyerCard from './lawyers-card';
import { cn, ComputedLawyersData } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';
import LawyersNavbar from './lawyers-navbar';
import { useState } from 'react';

const LawyersList = ({
  computedLawyersData,
  gridLimit = 6,
  className,
  listClassName,
}: {
  computedLawyersData: ComputedLawyersData;
  gridLimit?: number;
  className?: string;
  listClassName?: string;
}) => {
  const isMobile = useIsMobile({ breakpoint: 1024 });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const currentLawyers =
    activeCategory === 'all'
      ? computedLawyersData.allLawyers
      : computedLawyersData.lawyersByCategory[activeCategory] || [];

  return (
    <div className={className}>
      <LawyersNavbar
        categories={computedLawyersData.filterOptions}
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
          {currentLawyers.slice(0, gridLimit).map((lawyer, index) => (
            <LawyerCard
              key={`${lawyer.slug.current}-${index}`}
              lawyer={lawyer as any}
            />
          ))}
        </div>
      ) : (
        <LawyersCarousel
          lawyers={currentLawyers as any[]}
          className={listClassName}
        />
      )}
    </div>
  );
};

export default LawyersList;
