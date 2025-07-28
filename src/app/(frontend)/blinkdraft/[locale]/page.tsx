import {
  getBlinkdraftPageData,
  getGeneralInfoData,
} from '@/src/sanity/lib/cached-queries';
import IconButton from '@/src/components/ui/buttons/icon-button';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/src/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Section from '@/src/components/ui/section';
import Subtitle from '@/src/components/ui/subtitle';
import WhatIfSection from '@/src/components/blinkdraft/whatIf-section';
import SubscriptionsSection from '@/src/components/blinkdraft/subscriptions-section';
import PackageDetailsSection from '@/src/components/blinkdraft/package-details-section';
import AdditionalFeaturesSection from '@/src/components/blinkdraft/additional-features-section';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import notFound from '../../not-found';
import { routing } from '@/src/i18n/routing';
import LanguageSwitcher from '@/src/components/blinkdraft/language-switcher';
import VideoPlayer from '@/src/components/blinkdraft/video-player';
import { AnimateOnLoad } from '@/src/components/animations/animate-on-load';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BlinkDraftPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'sr') {
    notFound();
  }

  setRequestLocale(locale);

  const [blinkdraftPage, { generalInfo }] = await Promise.all([
    getBlinkdraftPageData(locale),
    getGeneralInfoData(),
  ]);

  if (!blinkdraftPage || !blinkdraftPage.blinkdraftPage) {
    return null;
  }

  const { blinkdraftPage: blinkdraftPageData } = blinkdraftPage;

  return (
    <NextIntlClientProvider locale={locale}>
      <main id='blinkdraftPage' className='pt-header'>
        <AnimateOnLoad>
          <section className='flex flex-col-reverse sm:flex-row relative px-side gap-15 sm:gap-12 xl:gap-30 3xl:gap-40 pb-16 sm:pb-31 xl:pb-37 2xl:pb-42 pt-16 sm:pt-20 xl:pt-18 2xl:pt-35'>
            <LanguageSwitcher
              locale={locale}
              className='absolute top-4 sm:top-6 lg:top-18 2xl:top-35 left-side'
            />
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

              <IconButton
                href={`/blinkdraft/${locale}/subscribe`}
                pageName='Subscribe to Blinkdraft'
                locale={locale}
                text={
                  blinkdraftPageData.heroSection?.buttons?.subscribeButton
                    .text as string
                }
                className='w-fit'
              />
            </div>

            <div className='w-full overflow-hidden rounded-tl-[80px] rounded-br-[80px] md:rounded-tl-[120px] md:rounded-br-[120px] xl:rounded-tl-[150px] xl:rounded-br-[150px] 2xl:rounded-tl-[200px] 2xl:rounded-br-[200px] aspect-[656/731] xl:max-w-5/12'>
              <Image
                src={urlFor(
                  blinkdraftPageData.heroSection.backgroundImage
                ).url()}
                alt={blinkdraftPageData.heroSection.heading}
                width={722}
                height={762}
                className='object-cover w-full h-full'
                priority
              />
            </div>
          </section>
        </AnimateOnLoad>

        {blinkdraftPageData.demoSection.demoVideoPlaybackId && (
          <Section variant='dark' underColor='bg-white'>
            <Subtitle className='text-white mx-auto'>
              {blinkdraftPageData.demoSection.subtitle}
            </Subtitle>
            <h2 className='text-white text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-5 sm:mt-6 2xl:mt-10 text-center'>
              {blinkdraftPageData.demoSection.heading}
            </h2>

            <div className='grid grid-cols-6 xl:grid-cols-12 gap-4 xl:gap-10 mt-8 xl:mt-9 2xl:mt-14'>
              <div className='w-full h-full aspect-[1656/932] col-span-full md:col-span-4 md:col-start-2 lg:col-span-8 xl:col-start-3 rounded-2xl 2xl:rounded-[20px] overflow-hidden'>
                <VideoPlayer
                  videoId={
                    blinkdraftPageData.demoSection.demoVideoPlaybackId as string
                  }
                  poster={
                    (blinkdraftPageData.demoSection
                      .demoVideoPoster as SanityImageSource) ||
                    (generalInfo?.blinkdraftLogo as SanityImageSource)
                  }
                />
              </div>
            </div>
          </Section>
        )}

        <WhatIfSection
          heading={blinkdraftPageData.whatIsSection.heading}
          descriptions={blinkdraftPageData.whatIsSection.description}
        />

        <SubscriptionsSection
          heading={blinkdraftPageData.subscriptionPlansSection.heading}
          subscriptionPlans={
            blinkdraftPageData.subscriptionPlansSection.subscriptionPlans
          }
          locale={locale}
        />

        <Section
          variant='dark'
          underColor='bg-light-blue-bg'
          className='flex flex-col gap-19 sm:gap-18 xl:gap-10 2xl:gap-15'
        >
          <h2 className='sm:max-w-9/10 lg:max-w-7/10 2xl:max-w-6/10 text-white text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
            {blinkdraftPageData.ctaSection.heading}
          </h2>
          <IconButton
            href={`/blinkdraft/${locale}/subscribe`}
            pageName='Subscribe to Blinkdraft'
            locale={locale}
            text={blinkdraftPageData.ctaSection.buttonText}
            className='w-fit'
          />
        </Section>

        <PackageDetailsSection
          heading={blinkdraftPageData.packageDetailsSection.heading}
          description={
            blinkdraftPageData.packageDetailsSection.description as string
          }
          packageDetails={blinkdraftPageData.packageDetailsSection.packages}
          locale={locale}
        />

        <AdditionalFeaturesSection
          heading={blinkdraftPageData.additionalFeaturesSection.title}
          features={
            blinkdraftPageData.additionalFeaturesSection.additionalFeatures
          }
          contactUsFormModal={blinkdraftPageData.contactUsFormModal}
        />
      </main>
    </NextIntlClientProvider>
  );
};

export default BlinkDraftPage;
