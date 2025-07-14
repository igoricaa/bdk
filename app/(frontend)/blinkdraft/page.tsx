import {
  getBlinkdraftPageData,
  getGeneralInfoData,
} from '@/sanity/lib/cached-queries';
import IconButton from '@/components/ui/buttons/icon-button';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Section from '@/components/ui/section';
import Subtitle from '@/components/ui/subtitle';
import WhatIfSection from '@/components/blinkdraft/whatIfSection';
import SubscriptionsSection from '@/components/blinkdraft/subscriptionsSection';

const BlinkDraftPage = async () => {
  const [blinkdraftPage, { generalInfo }] = await Promise.all([
    getBlinkdraftPageData(),
    getGeneralInfoData(),
  ]);

  if (!blinkdraftPage || !blinkdraftPage.blinkdraftPage) {
    return null;
  }

  const { blinkdraftPage: blinkdraftPageData } = blinkdraftPage;

  return (
    <main className='pt-header'>
      <section className='flex flex-col-reverse md:flex-row gap-15 px-side md:gap-12 xl:gap-30 3xl:gap-40 pb-16 md:pb-31 xl:pb-37 2xl:pb-42 pt-7.5 md:pt-11 xl:pt-18 2xl:pt-35'>
        <div className='flex flex-col sm:justify-end xl:pb-19 3xl:pb-37 gap-8 sm:gap-7 xl:gap-8 2xl:gap-18'>
          <div className='flex flex-col gap-8 sm:gap-7 2xl:gap-13'>
            {generalInfo?.blinkdraftLogo && (
              <Image
                src={urlFor(
                  generalInfo.blinkdraftLogo as SanityImageSource
                ).url()}
                alt={blinkdraftPageData.heroSection.heading}
                width={454}
                height={144}
                className='object-cover w-32 sm:w-35 xl:w-44 h-full'
                unoptimized={true}
                priority
              />
            )}

            <h1 className='text-dark-blue text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
              {blinkdraftPageData.heroSection.heading}
            </h1>
          </div>

          <div className='flex flex-col xl:flex-row gap-2.5'>
            <IconButton
              href='#'
              text={
                blinkdraftPageData.heroSection?.buttons?.requestFreeTrialButton
                  .text as string
              }
              className='w-fit'
            />
            <IconButton
              href='#'
              text={
                blinkdraftPageData.heroSection?.buttons?.subscribeButton
                  .text as string
              }
              className='w-fit'
            />
          </div>
        </div>

        <div className='w-full overflow-hidden rounded-tl-[5rem] rounded-br-[5rem]'>
          <Image
            src={urlFor(blinkdraftPageData.heroSection.backgroundImage).url()}
            alt={blinkdraftPageData.heroSection.heading}
            width={722}
            height={762}
            className='object-cover w-full h-full'
            quality={100}
            priority
          />
        </div>
      </section>

      <Section variant='dark' underColor='bg-white'>
        <Subtitle className='text-white mx-auto'>
          {blinkdraftPageData.demoSection.subtitle}
        </Subtitle>
        <h2 className='text-white text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-5 sm:mt-6 2xl:mt-10 text-center'>
          {blinkdraftPageData.demoSection.heading}
        </h2>

        {/* {blinkdraftPageData.demoSection.demoVideo && ( */}
        <div className='grid grid-cols-6 xl:grid-cols-12 gap-4 xl:gap-10 mt-7.5'>
          <div className='bg-white w-full h-full aspect-[1656/932] col-span-full sm:col-span-4 sm:col-start-2 lg:col-span-8 lg:col-start-3 rounded-2xl 2xl:rounded-[20px]'></div>
          {/* <Image
              src={urlFor(
                blinkdraftPageData.demoSection.demoVideo as SanityImageSource
              ).url()}
              alt={'Blinkdraft Demo Video'}
              width={1656}
              height={932}
            /> */}
        </div>
        {/* )} */}
      </Section>

      <WhatIfSection
        heading={blinkdraftPageData.whatIsSection.heading}
        descriptions={blinkdraftPageData.whatIsSection.description}
      />

      <SubscriptionsSection
        heading={blinkdraftPageData.subscriptionPlansSection.heading}
        subscriptionPlans={
          blinkdraftPageData.subscriptionPlansSection.subscriptionPlans
        }
      />
    </main>
  );
};

export default BlinkDraftPage;
