import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const aboutUsHeroSectionType = defineType({
  name: 'aboutUsHeroSection',
  title: 'About Us Hero Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main hero heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainDescription',
      title: 'Main Description',
      type: 'text',
      description:
        'Main description text that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryDescription',
      title: 'Secondary Description',
      type: 'text',
      description:
        'Secondary description text that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'About Us Hero Section',
      };
    },
  },
});
