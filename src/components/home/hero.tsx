import { AuroraBackground } from '../ui/aurora-background';
import { InViewWrapper } from '../ui/in-view-wrapper';
import { AnimatedHeroHeading } from './animated-hero-heading';

const Hero = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <AuroraBackground className='h-[calc(100vh-20px)] md:h-[calc(100vh-40px)]'>
      <InViewWrapper>
        <AnimatedHeroHeading
          text={heading}
          className='text-dark-blue md:line-clamp-3 md:max-w-xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl text-[2.5rem] sm:text-5xl lg:text-7xl 2xl:text-[5rem] leading-[1.1]'
        />
      </InViewWrapper>
      <InViewWrapper delay={0.3}>
        <p className='text-grey-text mt-8 2xl:mt-10 md:line-clamp-4 text-lg 2xl:text-xl leading-tight sm:max-w-lg md:max-w-xl xl:max-w-[620px] 2xl:max-w-2xl'>
          {description}
        </p>
      </InViewWrapper>
    </AuroraBackground>
  );
  {
    /* </section> */
  }
};

export default Hero;

/* <section className='relative h-screen w-full px-side pt-22 md:pt-20 2xl:pt-37'>
    <Image
      src={urlFor(homePageData.hero.backgroundImage).url()}
      alt={homePageData.hero.backgroundImage.alt}
      fill
      className='object-cover'
      priority
      sizes='(max-width: 640px) 640px, (max-width: 1280px) 1280px, 2560px'
    />

    <h1 className='md:line-clamp-3 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl relative'>
      {homePageData.hero.heading}
    </h1>
    <p className='mt-5 md:mt-0 md:line-clamp-4 md:absolute top-[50vh] right-1/5 sm:text-lg 2xl:text-2xl leading-tight sm:max-w-md 2xl:max-w-2xl border-l-4 border-light-blue pl-4 sm:pl-5 xl:pl-8 2xl:pl-10 py-4'>
      {homePageData.hero.description}
    </p>
  </section> */
// };

/* <section className='px-side h-screen flex flex-col justify-center bg-white'> */

/* h-[calc(100vh-20px)] md:h-[calc(100vh-40px)] */
