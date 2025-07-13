import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const blinkdraftHeroSectionType = defineType({
  name: 'blinkdraftHeroSection',
  title: 'Blinkdraft Hero Section',
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
        title: title || 'Blinkdraft Hero Section',
      };
    },
  },
});
