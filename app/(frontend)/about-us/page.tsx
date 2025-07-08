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

  console.log(aboutUsPage, generalInfo);

  return <main></main>;
};

export default AboutUsPage;
