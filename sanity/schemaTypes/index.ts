import { authorType } from './authorTypes';
import { blockContentType } from './blockContentType';
import { categoryType } from './categories';
import { externalImageType } from './externalImageType';
import { lawyerType, lawyerCategoryType } from './lawyers';
import { portableTextType } from './portableTextType';
import { postType } from './posts';
import { serviceType } from './services';

const schemaTypes = [
  blockContentType,
  lawyerType,
  lawyerCategoryType,
  serviceType,
  postType,
  categoryType,
  authorType,
  portableTextType,
  externalImageType,
];

export default schemaTypes;
