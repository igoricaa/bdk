import { defineField, defineType } from 'sanity';
import { FileTextIcon } from 'lucide-react';

export const newsroomSectionType = defineType({
  name: 'newsroomSection',
  title: 'Newsroom Section',
  type: 'object',
  icon: FileTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the newsroom section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle for the newsroom section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text for the newsroom section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the call-to-action button',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Newsroom Section',
      };
    },
  },
});
