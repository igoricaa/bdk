import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'bgImages',
      title: 'Background Images',
      type: 'object',
      description: 'Images for the hero section',
      fields: [
        defineField({
          name: 'image1',
          title: 'Image 1',
          type: 'image',
          description: 'Image 1 for the hero section',
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
          validation: (rule) => rule.required().error('Image 1 is required'),
        }),
        defineField({
          name: 'image2',
          title: 'Image 2',
          type: 'image',
          description: 'Image 2 for the hero section',
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
          validation: (rule) => rule.required().error('Image 2 is required'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Background images are required'),
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
