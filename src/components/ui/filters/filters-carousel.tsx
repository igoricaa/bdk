import { cn } from '@/src/lib/utils';
import { Button } from '../button';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from '../carousel';

const FiltersCarousel = ({
  options,
  activeOption,
  onOptionChange,
  className,
  getButtonStyles,
}: {
  options: {
    slug: string;
    label: string;
  }[];
  activeOption: string;
  onOptionChange: (slug: string) => void;
  className?: string;
  getButtonStyles: (isActive: boolean) => string;
}) => {
  return (
    <Carousel
      className={cn('max-w-[445px] 2xl:max-w-[535px] px-11.25', className)}
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className='-ml-1.5 '>
        {options.map((option) => (
          <CarouselItem
            key={option.slug}
            className='basis-[20%] max-w-[90px] pl-1.5'
          >
            <Button
              key={option.slug}
              size='sm'
              onClick={() => onOptionChange(option.slug)}
              className={cn(
                getButtonStyles(activeOption === option.slug),
                option.label.toLowerCase() === 'latest' &&
                  'max-w-20 2xl:max-w-21'
              )}
            >
              {option.label}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className='size-7.5 min-w-7.5 2xl:size-10 2xl:min-w-10 left-0 bg-light-blue cursor-pointer border-light-blue outline-none hover:bg-transparent transition-colors duration-300 group'
        iconClassName='stroke-1.25 stroke-white size-5.5 group-hover:stroke-light-blue transition-colors duration-300'
      />
      <CarouselNext
        className='size-7.5 min-w-7.5 2xl:size-10 2xl:min-w-10 right-0 bg-light-blue cursor-pointer border-light-blue outline-none hover:bg-transparent transition-colors duration-300 group'
        iconClassName='stroke-1.25 stroke-white size-5.5 group-hover:stroke-light-blue transition-colors duration-300'
      />
    </Carousel>
  );
};

export default FiltersCarousel;
