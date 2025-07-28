import { AuroraBackground } from '../ui/aurora-background';
import { InViewWrapper } from '../ui/in-view-wrapper';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { AnimatedHeroHeading } from './animated-hero-heading-new';
// import { Image } from 'next-sanity/image';
import { urlFor } from '@/src/sanity/lib/image';

import Image from 'next/image';
import SquareAnimated from './square-animated';

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
    <AuroraBackground className='grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 items-center'>
      <SquareAnimated />
      <div className='col-span-1 xl:col-span-7'>
        <InViewWrapper>
          <AnimatedHeroHeading
            text={heading}
            className='text-dark-blue md:line-clamp-3 md:max-w-xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl text-[2.5rem] sm:text-5xl lg:text-7xl 2xl:text-[5rem] leading-[1.1]'
          />
        </InViewWrapper>
        <InViewWrapper delay={0.5}>
          <div className='relative mt-8 md:max-w-3/5 xl:max-w-[620px] 2xl:max-w-2xl 2xl:mt-10'>
            <p className='text-grey-text text-lg leading-tight 2xl:text-xl'>
              {description}
            </p>
          </div>
        </InViewWrapper>
      </div>
    </AuroraBackground>
  );
};

export default Hero;
