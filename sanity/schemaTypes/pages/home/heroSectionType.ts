import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Large background image for the hero section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility',
          validation: (rule) =>
            rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (rule) =>
        rule.required().error('Background image is required'),
    }),
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
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        media,
      };
    },
  },
});
