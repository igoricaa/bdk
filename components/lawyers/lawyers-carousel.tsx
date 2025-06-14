import { Lawyer } from '@/sanity.types';
import {
  Carousel,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
  CarouselItem,
} from '../ui/carousel';
import LawyerCard from './lawyers-card';

const LawyersCarousel = ({
  lawyers,
  className,
}: {
  lawyers: Lawyer[];
  className?: string;
}) => {
  return (
    <Carousel className={className} opts={{ dragFree: true }}>
      <CarouselContent className='-ml-side'>
        {lawyers.map((lawyer) => (
          <CarouselItem key={lawyer.name} className='basis-[23%] pl-5 2xl:pl-8'>
            <LawyerCard lawyer={lawyer} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default LawyersCarousel;
