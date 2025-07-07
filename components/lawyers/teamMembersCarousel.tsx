'use client';

import { Lawyer } from '@/sanity.types';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '../ui/carousel';
import LawyerCard from './lawyers-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/use-mobile';

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const TeamMembersCarousel = ({
  lawyers,
  className,
  itemClassName,
}: {
  lawyers: Lawyer[];
  className?: string;
  itemClassName?: string;
}) => {
  const isMobile = useIsMobile({ breakpoint: 640 });

  if (isMobile) {
    const lawyerChunks = chunkArray(lawyers, 4);

    return (
      <Carousel className={className} opts={{ dragFree: false }}>
        <CarouselContent className='ml-0'>
          {lawyerChunks.map((chunk, index) => (
            <CarouselItem
              key={`grid-${index}`}
              className={cn(
                'max-w-[calc(100vw-2*(var(--padding-side)))] mx-auto pl-5 '
              )}
            >
              <div className='grid grid-cols-2 grid-rows-2 gap-4'>
                {chunk.map((lawyer) => (
                  <LawyerCard key={lawyer.name} lawyer={lawyer} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots
          className='px-side mt-8'
          barColor='bg-[rgba(137,138,141,0.2)]'
        />
      </Carousel>
    );
  }

  return (
    <Carousel className={className} opts={{ dragFree: true }}>
      <CarouselContent className=''>
        {lawyers.map((lawyer) => (
          <CarouselItem
            key={lawyer.name}
            className={cn('pl-5 2xl:pl-8', itemClassName)}
          >
            <LawyerCard lawyer={lawyer} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TeamMembersCarousel;
