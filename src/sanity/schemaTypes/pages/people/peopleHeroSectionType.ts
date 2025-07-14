import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const peopleHeroSectionType = defineType({
  name: 'peopleHeroSection',
  title: 'People Hero Section',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'People Hero Section',
      };
    },
  },
});
