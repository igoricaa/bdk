'use client';

import { Post } from '@/sanity.types';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '../ui/carousel';
import FeaturedPostCard from './featured-post-card';

const FeaturedPostsCarousel = ({
  featuredPosts,
  className,
}: {
  featuredPosts: Post[];
  className?: string;
}) => {
  return (
    <Carousel
      className={className}
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent className='ml-0'>
        {featuredPosts.map((post, index) => (
          <CarouselItem key={post._id + index} className='pl-side pr-side'>
            <FeaturedPostCard
              key={post._id}
              post={post}
              index={index}
              className='h-full'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className='px-side' />
    </Carousel>
  );

  {
  }
};

export default FeaturedPostsCarousel;
