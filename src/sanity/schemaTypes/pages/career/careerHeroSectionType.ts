import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const careerHeroSectionType = defineType({
  name: 'careerHeroSection',
  title: 'Career Hero Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Hero heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openPositionsSection',
      title: 'Open Positions Section',
      type: 'object',
      description: 'Open positions section',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the open positions section',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'openPositions',
          title: 'Open Positions',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'openPosition' } }],
          description: 'List of open positions to display on the career page',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Career Hero Section',
      };
    },
  },
});
