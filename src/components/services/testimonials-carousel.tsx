'use client';

import { cn } from '@/src/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from '../ui/carousel';
import { Testimonial } from '@/src/sanity/schemaTypes/services/testimonialTypes';
import Autoplay from 'embla-carousel-autoplay';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  cardClassName?: string;
}

export default function TestimonialsCarousel({
  testimonials,
  className,
  cardClassName,
}: TestimonialsCarouselProps) {
  return (
    <div
      className={cn(
        'border-l-[3px] border-light-blue pl-5 2xl:pl-8 space-y-6',
        className
      )}
    >
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className=''>
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={testimonial.author + index}
              className='pl-5 2xl:pl-8'
            >
              <TestimonialCard
                testimonial={testimonial}
                className={cardClassName}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  );
}

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => {
  return (
    <article className={cn('pb-10 md:pb-17 2xl:pb-23', className)}>
      <div className='flex flex-col md:flex-col-reverse gap-10 md:gap-12 2xl:gap-15'>
        <p className='text-grey-text text-lg xl:text-2xl 2xl:text-[2rem] italic'>
          '{testimonial.text}'
        </p>
        <p className='text-dark-blue text-sm md:text-lg 2xl:text-2xl'>
          {testimonial.author}
        </p>
      </div>
    </article>
  );
};
