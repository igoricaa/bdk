import { AuroraBackground } from '../ui/aurora-background';
import { AnimatedHeroHeading } from './animated-hero-heading-new';
import { AnimateOnLoad } from '../animations/animate-on-load';
import Link from 'next/link';
import ArrowUpRight from '../ui/arrow-up-right';

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
          className='text-dark-blue md:max-w-xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl text-[2.5rem] sm:text-5xl lg:text-7xl 2xl:text-[5rem] 3xl:text-[6rem] leading-[1.1] text-center xl:max-3xl:pt-16'
        />
      </AnimateOnLoad>
      <AnimateOnLoad delay={0.35} className='mt-15 2xl:mt-20'>
        <p className='text-grey-text text-lg leading-tight 2xl:text-xl 3xl:text-2xl text-center md:max-w-3/5 xl:max-w-[620px] 2xl:max-w-2xl 3xl:max-w-3xl mx-auto'>
          {description}
        </p>
      </AnimateOnLoad>
      <AnimateOnLoad
        delay={1}
        className='flex flex-col gap-4 mt-17 2xl:mt-20 3xl:mt-16 items-center'
      >
        <p className='text-light-blue text-lg 2xl:text-xl'>Explore</p>
        <Link href='#about' className='cursor-pointer'>
          <ArrowUpRight className='rotate-135 hover:rotate-135' />
        </Link>
      </AnimateOnLoad>
    </AuroraBackground>
  );
};

export default Hero;
