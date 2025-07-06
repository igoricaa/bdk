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
    defineField({
      name: 'newsroom',
      title: 'Newsroom Section',
      type: 'object',
      description: 'Newsroom section at the bottom of the page',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Subtitle for the newsroom section',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the newsroom section',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Description for the newsroom section',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Newsroom section info is required'),
    }),
  ],
});

export { peopleHeroSectionType };
