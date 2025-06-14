'use client';

import { Lawyer } from '@/sanity.types';
import LawyerCard from './lawyers-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';

const LawyersGrid = ({
  lawyers,
  className,
}: {
  lawyers: Lawyer[];
  className?: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div
          className={cn(
            'px-side grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
            className
          )}
        >
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <LawyersCarousel lawyers={lawyers} className={className} />
      )}
    </>
  );
};

export default LawyersGrid;
