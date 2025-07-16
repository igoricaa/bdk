import { Image } from 'next-sanity/image';
import { AuroraBackground } from '../ui/aurora-background';
import { InViewWrapper } from '../ui/in-view-wrapper';
import { AnimatedHeroHeading } from './animated-hero-heading';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/src/sanity/lib/image';

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
      <InViewWrapper delay={0.3}>
        <div className='mt-8 2xl:mt-10 md:max-w-3/5 xl:max-w-[620px] 2xl:max-w-2xl relative'>
          <p className='text-grey-text text-lg 2xl:text-xl leading-tight'>
            {description}
          </p>
          <div className='absolute aspect-square w-[120px] lg:w-[180px] 2xl:w-[244px] top-[calc(100%+1rem)] right-0 md:top-0 md:-right-[152px] lg:-right-[212px] xl:-right-[280px] rounded-bl-4xl lg:rounded-bl-[3rem] overflow-hidden'>
            <Image
              src={urlFor(bgImages.image2).url()}
              alt='BDK Advokati - Hero Image'
              priority
              quality={100}
              width={544}
              height={544}
              className='object-cover w-full h-full'
            />
          </div>
        </div>
      </InViewWrapper>
    </AuroraBackground>
  );
};

export default Hero;
