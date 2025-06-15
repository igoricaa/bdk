import { defineField, defineType } from 'sanity';
import { FileTextIcon, ImageIcon } from 'lucide-react';

export const latestPostsSectionType = defineType({
  name: 'latestPostsSection',
  title: 'Latest Posts Section',
  type: 'object',
  icon: FileTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the latest posts section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle for the latest posts section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text for the latest posts section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'illustrations',
      title: 'Illustrations',
      type: 'object',
      icon: ImageIcon,
      fields: [
        defineField({
          name: 'blogIllustration',
          title: 'Blog',
          type: 'image',
          description: 'Blog illustration image',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'digitalWatchIllustration',
          title: 'Digital Watch',
          type: 'image',
          description: 'Digital Watch illustration image',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'insightsIllustration',
          title: 'Insights',
          type: 'image',
          description: 'Insights illustration image',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'publicationsIllustration',
          title: 'Publications',
          type: 'image',
          description: 'Publications illustration image',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Latest Posts Section',
      };
    },
  },
});
