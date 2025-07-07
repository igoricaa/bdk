'use client';

import { Lawyer } from '@/sanity.types';
import LawyerCard from './lawyers-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';

const LawyersList = ({
  lawyers,
  gridLimit = 6,
  className,
}: {
  lawyers: Lawyer[];
  gridLimit?: number;
  className?: string;
}) => {
  const isMobile = useIsMobile({ breakpoint: 1024 });

  return (
    <>
      {isMobile ? (
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
            className
          )}
        >
          {lawyers.slice(0, gridLimit).map((lawyer, index) => (
            <LawyerCard key={`${lawyer._id}-${index}`} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <LawyersCarousel lawyers={lawyers} className={className} />
      )}
    </>
  );
};

export default LawyersList;
