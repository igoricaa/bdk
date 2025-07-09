import { CountriesSection } from '@/components/about-us/countries-section';
import IndependentReviewsSection from '@/components/about-us/independent-reviews-section';
import SplitSection from '@/components/ui/split-section';
import {
  getAboutUsPageData,
  getGeneralInfoData,
} from '@/sanity/lib/cached-queries';

const AboutUsPage = async () => {
  const [aboutUsPage, generalInfo] = await Promise.all([
    getAboutUsPageData(),
    getGeneralInfoData(),
  ]);

  if (!aboutUsPage) {
    return null;
  }

  const { aboutUsPage: aboutUsPageData } = aboutUsPage;

  return (
    <main className='pt-header'>
      <SplitSection
        subtitle={aboutUsPageData?.hero.subtitle || ''}
        heading={aboutUsPageData?.hero.heading || ''}
        image={aboutUsPageData?.hero.backgroundImage || ''}
        highlightedText={aboutUsPageData?.hero.mainDescription || ''}
        description={aboutUsPageData?.hero.secondaryDescription || ''}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 px-side'
      />

      {generalInfo.generalInfo?.countries && (
        <CountriesSection countries={generalInfo.generalInfo.countries} />
      )}

      <IndependentReviewsSection
        heading={aboutUsPageData?.independentReviews.heading || ''}
        description={aboutUsPageData?.independentReviews.description || ''}
        reviews={aboutUsPageData?.independentReviews.reviews || []}
      />
    </main>
  );
};

export default AboutUsPage;
