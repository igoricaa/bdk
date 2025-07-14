import { defineField, defineType } from 'sanity';
import { FileTextIcon } from 'lucide-react';

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
