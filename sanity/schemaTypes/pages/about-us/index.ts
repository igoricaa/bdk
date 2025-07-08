import { defineField, defineType } from 'sanity';
import { UsersIcon } from 'lucide-react';

import { aboutUsHeroSectionType } from './aboutUsHeroSectionType';
import { independentReviewsSectionType } from './independentReviewsSectionType';

export const aboutUsPageType = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the about us page (not displayed on frontend)',
      initialValue: 'About Us Page',
      validation: (rule) => rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'hero',
      title: 'About Us Hero Section',
      type: 'aboutUsHeroSection',
      description: 'Main hero section at the top of the page',
      validation: (rule) => rule.required().error('Hero section is required'),
    }),
    defineField({
      name: 'independentReviews',
      title: 'Independent Reviews Section',
      type: 'independentReviewsSection',
      description: 'Independent reviews section at the bottom of the page',
      validation: (rule) =>
        rule.required().error('Independent reviews section is required'),
    }),
  ],
});

export { aboutUsHeroSectionType, independentReviewsSectionType };
