import { Lawyer } from '@/sanity.types';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import LawyerCard from './lawyers-card';
import { BlurFade } from '../animations/blur-fade';
import { AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const LawyersCarousel = ({
  lawyers,
  className,
}: {
  lawyers: Lawyer[];
  className?: string;
}) => {
  return (
    <Carousel
      className={cn(className, 'aspect-[3.47]')}
      opts={{
        dragFree: true,
        align: 'start',
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className='ml-0 pl-[calc(var(--padding-side)-20px)] 2xl:pl-[calc(var(--padding-side)-32px)] lg:has-[.toBlur:hover]:[&_.toBlur]:blur-xxs'>
        <AnimatePresence mode='wait'>
          {lawyers.map((lawyer) => (
            <CarouselItem
              key={lawyer.name}
              className='basis-[23%] pl-5 2xl:pl-8 '
            >
              <BlurFade className='w-fit' duration={0.2}>
                <LawyerCard
                  lawyer={lawyer}
                  className='toBlur hover:!blur-none transition-blur duration-300'
                />
              </BlurFade>
            </CarouselItem>
          ))}
        </AnimatePresence>
      </CarouselContent>
    </Carousel>
  );
};

export default LawyersCarousel;
