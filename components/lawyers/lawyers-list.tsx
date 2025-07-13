'use client';

import LawyerCard from './lawyers-card';
import { cn, ComputedLawyersData } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';
import LawyersNavbar from './lawyers-navbar';
import { useMemo, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const displayedLawyers = useMemo(() => {
    const categoryFilteredLawyers =
      activeCategory === 'all'
        ? computedLawyersData.allLawyers
        : computedLawyersData.lawyersByCategory[activeCategory] || [];

    if (!searchTerm || searchTerm.trim() === '') {
      return categoryFilteredLawyers;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return categoryFilteredLawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [activeCategory, searchTerm, computedLawyersData]);

  return (
    <div className={className}>
      <LawyersNavbar
        categories={computedLawyersData.filterOptions}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
      />

      {isMobile ? (
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
            listClassName
          )}
        >
          {displayedLawyers.slice(0, gridLimit).map((lawyer, index) => (
            <LawyerCard
              key={`${lawyer.slug.current}-${index}`}
              lawyer={lawyer as any}
            />
          ))}
        </div>
      ) : (
        <LawyersCarousel
          lawyers={displayedLawyers as any[]}
          className={listClassName}
        />
      )}
    </div>
  );
};

export default LawyersList;
