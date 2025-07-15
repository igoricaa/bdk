import { Lawyer } from '@/sanity.types';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import LawyerCard from './lawyers-card';

const LawyersCarousel = ({
  lawyers,
  className,
}: {
  lawyers: Lawyer[];
  className?: string;
}) => {
  return (
    <Carousel
      className={className}
      opts={{
        dragFree: true,
        align: 'start',
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className='ml-0 pl-[calc(var(--padding-side)-20px)] 2xl:pl-[calc(var(--padding-side)-32px)] has-[>*:hover]:[&>*]:blur-xs'>
        {lawyers.map((lawyer) => (
          <CarouselItem
            key={lawyer.name}
            className='basis-[23%] pl-5 2xl:pl-8 duration-300 transition-blur hover:!blur-none'
          >
            <LawyerCard lawyer={lawyer} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default LawyersCarousel;
