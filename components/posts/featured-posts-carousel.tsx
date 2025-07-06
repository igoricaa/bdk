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
          delay: 300000,
        }),
      ]}
    >
      <CarouselContent>
        {featuredPosts.map((post, index) => (
          <CarouselItem key={post._id + index} className='pl-5 2xl:pl-8'>
            <FeaturedPostCard key={post._id} post={post} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );

  {
  }
};

export default FeaturedPostsCarousel;
