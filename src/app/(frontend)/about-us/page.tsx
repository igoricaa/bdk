import { CountriesSection } from '@/src/components/about-us/countries-section';
import IndependentReviewsSection from '@/src/components/about-us/independent-reviews-section';
import SplitSection from '@/src/components/ui/split-section';
import {
  getAboutUsPageData,
  getGeneralInfoData,
} from '@/src/sanity/lib/cached-queries';

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
        className='px-side'
      />

      {generalInfo.generalInfo?.countries && (
        <CountriesSection countries={generalInfo.generalInfo.countries} />
      )}

      {aboutUsPageData?.independentReviews.reviews &&
        aboutUsPageData?.independentReviews.reviews.length > 0 && (
          <IndependentReviewsSection
            heading={aboutUsPageData?.independentReviews.heading || ''}
            description={aboutUsPageData?.independentReviews.description || ''}
            reviews={aboutUsPageData?.independentReviews.reviews || []}
          />
        )}
    </main>
  );
};

export default AboutUsPage;
