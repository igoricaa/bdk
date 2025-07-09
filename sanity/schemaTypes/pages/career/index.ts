import { defineField, defineType } from 'sanity';
import { Briefcase } from 'lucide-react';
import { careerHeroSectionType } from './careerHeroSectionType';
import { openPositionType } from './openPositionType';
import { coursesSectionType } from './coursesSectionType';

export const careerPageType = defineType({
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the career page (not displayed on frontend)',
      initialValue: 'Career Page',
      validation: (rule) => rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'hero',
      title: 'Career Hero Section',
      type: 'careerHeroSection',
      description: 'Main hero section at the top of the page',
      validation: (rule) => rule.required().error('Hero section is required'),
    }),
    defineField({
      name: 'coursesSection',
      title: 'Courses Section',
      type: 'coursesSection',
      description: 'Courses section on the career page',
      validation: (rule) =>
        rule.required().error('Courses section is required'),
    }),
  ],
});

export { careerHeroSectionType, openPositionType, coursesSectionType };
