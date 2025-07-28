import { AuroraBackground } from '../ui/aurora-background';
import { AnimatedHeroHeading } from './animated-hero-heading-new';
import ScrollToButton from './scroll-to-button';
import { AnimateOnLoad } from '../animations/animate-on-load';

const Hero = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <AuroraBackground className='flex flex-col items-center justify-center'>
      <AnimateOnLoad>
        <AnimatedHeroHeading
          text={heading}
          className='text-dark-blue md:line-clamp-3 md:max-w-xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl text-[2.5rem] sm:text-5xl lg:text-7xl 2xl:text-[5rem] leading-[1.1] text-center'
        />
      </AnimateOnLoad>
      <AnimateOnLoad delay={0.35} className='mt-15 2xl:mt-20'>
        <p className='text-grey-text text-lg leading-tight 2xl:text-xl text-center md:max-w-3/5 xl:max-w-[620px] 2xl:max-w-2xl mx-auto'>
          {description}
        </p>
      </AnimateOnLoad>
      <AnimateOnLoad
        delay={1}
        className='flex flex-col gap-4 mt-17 2xl:mt-20 items-center'
      >
        <ScrollToButton />
      </AnimateOnLoad>
    </AuroraBackground>
  );
};

export default Hero;
