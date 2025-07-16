import { defineField, defineType } from 'sanity';
import { HomeIcon } from 'lucide-react';
import { heroSectionType } from './heroSectionType';
import { aboutSectionType } from './aboutSectionType';
import { teamSectionType } from './teamSectionType';
import { newsroomSectionType } from './newsroomSectionType';
import { latestPostsSectionType } from './latestPostsSectionType';
import { blinkdraftSectionType } from './blinkdraftSectionType';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero',
      icon: HomeIcon,
    },
    {
      name: 'content',
      title: 'Content Sections',
      icon: HomeIcon,
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the home page (not displayed on frontend)',
      initialValue: 'Home Page',
      validation: (rule) => rule.required().error('Page title is required'),
      group: 'hero',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      description: 'Main hero section at the top of the page',
      validation: (rule) => rule.required().error('Hero section is required'),
      group: 'hero',
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'aboutSection',
      description: 'About section with animated text and CTA',
      validation: (rule) => rule.required().error('About section is required'),
      group: 'content',
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'teamSection',
      description: 'Team introduction section',
      validation: (rule) => rule.required().error('Team section is required'),
      group: 'content',
    }),
    defineField({
      name: 'newsroom',
      title: 'Newsroom Section',
      type: 'newsroomSection',
      description: 'Newsroom section with latest news',
      validation: (rule) =>
        rule.required().error('Newsroom section is required'),
      group: 'content',
    }),
    defineField({
      name: 'latestPosts',
      title: 'Latest Posts Section',
      type: 'latestPostsSection',
      description: 'Latest blog posts section',
      validation: (rule) =>
        rule.required().error('Latest posts section is required'),
      group: 'content',
    }),
    defineField({
      name: 'blinkdraft',
      title: 'Blinkdraft Section',
      type: 'blinkdraftSection',
      description: 'Blinkdraft feature section',
      validation: (rule) =>
        rule.required().error('Blinkdraft section is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heroHeading: 'hero.heading',
    },
    prepare({ title, heroHeading }) {
      return {
        title: title || 'Home Page',
        subtitle: heroHeading ? `Hero: ${heroHeading}` : 'No hero content',
      };
    },
  },
});

// Export all section types for registration
export { heroSectionType };
export { aboutSectionType };
export { teamSectionType };
export { newsroomSectionType };
export { latestPostsSectionType };
export { blinkdraftSectionType };
