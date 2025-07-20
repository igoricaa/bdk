import { AuroraBackground } from '../ui/aurora-background';
import { InViewWrapper } from '../ui/in-view-wrapper';
import { AnimatedHeroHeading } from './animated-hero-heading';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { FloatingImage } from './floating-image';

const Hero = ({
  heading,
  description,
  bgImages,
}: {
  heading: string;
  description: string;
  bgImages: {
    image1: SanityImageSource;
    image2: SanityImageSource;
  };
}) => {
  return (
    <AuroraBackground>
      <InViewWrapper>
        <AnimatedHeroHeading
          text={heading}
          className='text-dark-blue md:line-clamp-3 md:max-w-xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl text-[2.5rem] sm:text-5xl lg:text-7xl 2xl:text-[5rem] leading-[1.1]'
          image={bgImages.image1}
        />
      </InViewWrapper>
      <InViewWrapper delay={0.5}>
        <div className='relative mt-8 md:max-w-3/5 xl:max-w-[620px] 2xl:max-w-2xl 2xl:mt-10'>
          <p className='text-grey-text text-lg leading-tight 2xl:text-xl'>
            {description}
          </p>
          <FloatingImage
            image={bgImages.image2}
            className='absolute top-[calc(100%+1rem)] right-0 aspect-square w-[120px] overflow-hidden rounded-bl-4xl md:top-0 md:-right-[152px] lg:w-[180px] lg:-right-[212px] lg:rounded-bl-[3rem] xl:-right-[280px] 2xl:w-[244px]'
          />
        </div>
      </InViewWrapper>
    </AuroraBackground>
  );
};

export default Hero;
