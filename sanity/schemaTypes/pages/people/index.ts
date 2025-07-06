import { defineField, defineType } from 'sanity';
import { UsersIcon } from 'lucide-react';

import { peopleHeroSectionType } from './peopleHeroSectionType';

export const peoplePageType = defineType({
  name: 'peoplePage',
  title: 'People Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the people page (not displayed on frontend)',
      initialValue: 'People Page',
      validation: (rule) => rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'hero',
      title: 'People Hero Section',
      type: 'peopleHeroSection',
      description: 'Main hero section at the top of the page',
      validation: (rule) => rule.required().error('Hero section is required'),
    }),
  ],
});

export { peopleHeroSectionType };
