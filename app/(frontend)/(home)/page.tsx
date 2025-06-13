import { client } from '@/sanity/lib/client';
import { HOME_PAGE_QUERYResult, Industry, Practice } from '@/sanity.types';
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Subtitle from '@/components/ui/subtitle';
import Link from 'next/link';
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';
import ServicesAccordion from '@/components/services-accordion';

export default async function Home() {
  const {
    homePage: homePageData,
    industries,
    practices,
  }: HOME_PAGE_QUERYResult = await client.fetch(HOME_PAGE_QUERY);

  if (!homePageData) {
    return <div>No home page data found</div>;
  }

  return (
    <main>
      {/* Hero */}
      <section className='relative h-screen w-full px-side pt-22 md:pt-20 2xl:pt-37'>
        <Image
          src={urlFor(homePageData.hero.backgroundImage).url()}
          alt={homePageData.hero.backgroundImage.alt}
          fill
          className='object-cover -z-10'
          priority
          sizes='(max-width: 640px) 640px, (max-width: 1280px) 1280px, 2560px'
        />

        <h1 className='max-w-4xl'>{homePageData.hero.heading}</h1>
        <p className='absolute top-[50vh] right-1/5 sm:text-lg 2xl:text-2xl leading-tight sm:max-w-md 2xl:max-w-2xl border-l-4 border-light-blue pl-4 sm:pl-5 xl:pl-8 2xl:pl-10 py-4'>
          {homePageData.hero.description}
        </p>
      </section>

      {/* About us */}
      <section className='px-side pt-12 pb-72 md:pt-24 md:pb-[28rem] xl:py-30 2xl:py-43 bg-dark-blue rounded-t-[2.5rem] -mt-10 relative overflow-hidden'>
        <Subtitle>{homePageData.about.subtitle}</Subtitle>

        <div className='flex xl:text-[53px] 2xl:text-6xl flex-col items-start justify-end pointer-events-auto mt-6 xl:mt-10 2xl:mt-15 2xl:max-w-[1330px]'>
          <TextGradientScroll
            text={homePageData.about.animatedText}
            className='text-white'
          />
        </div>
        <PortableText
          className='text-lightest-blue text-lg mt-8 xl:mt-12 2xl:mt-12 2xl:text-2xl 2xl:max-w-1/2'
          value={homePageData.about.description as PortableTextBlock[]}
        />
        <Link href='/about' className='text-white mt-10 2xl:mt-15'>
          {homePageData.about.buttonText}
        </Link>
        <div className='absolute -bottom-8 md:-bottom-40 xl:bottom-20 2xl:bottom-12 -right-[20vw] sm:right-0 2xl:-right-6 aspect-[936/622] w-[calc(120vw)] sm:w-screen xl:max-w-1/2'>
          <img
            src={urlFor(homePageData.about.backgroundIllustration).url()}
            alt='Background Illustration'
            className='object-cover w-full h-full'
          />
        </div>
      </section>
      {/* Services */}

      <section className='rounded-t-[2.5rem] pt-4 pb-25 md:pt-20 md:pb-37 xl:py-37 2xl:py-43 px-side flex md:gap-4 xl:gap-18 2xl:gap-24'>
        <ServicesAccordion
          className='w-7/12'
          industries={industries as Industry[]}
          practices={practices as Practice[]}
        />
        <div className='hidden md:block w-auto bg-dark-blue rounded-bl-[150px]'>
          <img
            src={urlFor(homePageData.services.practicesIllustration).url()}
            alt='Practices Illustration'
            className='object-cover w-full h-full'
          />
          <img
            src={urlFor(homePageData.services.industriesIllustration).url()}
            alt='Industries Illustration'
            className='hidden object-cover w-full h-full'
          />
        </div>
      </section>

      {/* Team */}

      {/* Newsroom */}

      {/* Latest posts */}

      {/* Blinkdraft */}
    </main>
  );
}
