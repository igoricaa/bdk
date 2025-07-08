import { defineType } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';
import {
  serviceBaseFields,
  serviceBaseGroups,
  serviceBasePreview,
} from '../serviceBaseSchema';

export const practiceType = defineType({
  name: 'practice',
  title: 'Practice',
  icon: BriefcaseIcon,
  type: 'document',
  groups: serviceBaseGroups,
  fields: serviceBaseFields,
  preview: serviceBasePreview,
});
