import { authorType } from './posts/authorTypes';
import { blockContentType } from './blockContentType';
import { categoryType } from './posts/categories';
import { externalImageType } from './externalImageType';
import { lawyerType, lawyerCategoryType } from './lawyers';
import { portableTextType } from './portableTextType';
import { postType } from './posts';
import { practiceType } from './services/practices';
import { industryType } from './services/industries';
import { foreignDeskType } from './services/foreignDesks';
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
import { countryType } from './general/countryType';
import { blinkdraftType } from './blinkdraft';
import { peopleHeroSectionType, peoplePageType } from './pages/people';

const schemaTypes = [
  blockContentType,
  lawyerType,
  lawyerCategoryType,
  practiceType,
  industryType,
  postType,
  categoryType,
  authorType,
  portableTextType,
  externalImageType,
  foreignDeskType,
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
];

export default schemaTypes;
