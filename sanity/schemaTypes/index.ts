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
];

export default schemaTypes;
