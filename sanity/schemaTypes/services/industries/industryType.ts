import { defineType } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';
import {
  serviceBaseFields,
  serviceBaseGroups,
  serviceBasePreview,
} from '../serviceBaseSchema';

export const industryType = defineType({
  name: 'industry',
  title: 'Industry',
  icon: BriefcaseIcon,
  type: 'document',
  groups: serviceBaseGroups,
  fields: serviceBaseFields,
  preview: serviceBasePreview,
});
