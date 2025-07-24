import { authorType } from './posts/authorTypes';
import { blockContentType } from './blockContentType';
import { categoryType } from './posts/categories';
import { externalImageType } from './externalImageType';
import { lawyerType, lawyerCategoryType } from './lawyers';
import { postType } from './posts';
import { practiceType } from './services/practices';
import { industryType } from './services/industries';
import { foreignDeskType } from './services/foreignDesks';
import { illustrationType } from './services/illustrationType';
import {
  aboutSectionType,
  teamSectionType,
  newsroomSectionType,
  latestPostsSectionType,
  blinkdraftSectionType,
  homePageType,
  heroSectionType,
} from './pages/home';
import { generalInfoType } from './general';
import { socialType } from './general/socialType';
import {
  blinkdraftCtaSectionType,
  blinkdraftDemoSectionType,
  blinkdraftHeroSectionType,
  blinkdraftSubscriptionPlansSectionType,
  blinkdraftSubscriptionPlanType,
  blinkdraftType,
  blinkdraftWhatIsSectionType,
  blinkdraftPackageDetailsSectionType,
  blinkdraftAdditionalFeaturesSectionType,
  contactUsFormType,
} from './pages/blinkdraft';
import { peopleHeroSectionType, peoplePageType } from './pages/people';
import { countryType } from './countries';
import {
  aboutUsPageType,
  aboutUsHeroSectionType,
  independentReviewsSectionType,
} from './pages/about-us';
import {
  careerPageType,
  careerHeroSectionType,
  openPositionType,
  coursesSectionType,
} from './pages/career';
import { privacyNoticeType } from './pages/law-pages/privacy-notice';
import { cookiePolicyType } from './pages/law-pages/cookie-policy';
import { tableSectionType } from './pages/law-pages/table-section';
import blinkdraftSubscriptionForm from './pages/blinkdraft/blinkdraftSubscriptionForm';

const schemaTypes = [
  blockContentType,
  lawyerType,
  lawyerCategoryType,
  practiceType,
  industryType,
  postType,
  categoryType,
  authorType,
  externalImageType,
  foreignDeskType,
  illustrationType,
  homePageType,
  aboutSectionType,
  teamSectionType,
  newsroomSectionType,
  latestPostsSectionType,
  blinkdraftSectionType,
  heroSectionType,
  generalInfoType,
  socialType,
  countryType,
  blinkdraftType,
  peoplePageType,
  peopleHeroSectionType,
  aboutUsPageType,
  aboutUsHeroSectionType,
  independentReviewsSectionType,
  careerPageType,
  careerHeroSectionType,
  openPositionType,
  coursesSectionType,
  blinkdraftHeroSectionType,
  blinkdraftDemoSectionType,
  blinkdraftWhatIsSectionType,
  blinkdraftSubscriptionPlansSectionType,
  blinkdraftCtaSectionType,
  blinkdraftSubscriptionPlanType,
  blinkdraftPackageDetailsSectionType,
  blinkdraftAdditionalFeaturesSectionType,
  privacyNoticeType,
  cookiePolicyType,
  tableSectionType,
  blinkdraftSubscriptionForm,
  contactUsFormType,
];

export default schemaTypes;
