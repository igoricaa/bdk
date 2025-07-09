import { defineField, defineType } from 'sanity';
import { Briefcase } from 'lucide-react';

export const openPositionType = defineType({
  name: 'openPosition',
  title: 'Open Position',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error('Position title is required')
          .max(100)
          .warning('Keep title under 100 characters for better display'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Office location',
      validation: (rule) =>
        rule
          .required()
          .error('Location is required')
          .max(50)
          .warning('Keep location under 50 characters'),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      description: 'Job description or application form PDF',
      options: {
        accept: '.pdf',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
    },
    prepare(selection) {
      const { title, location } = selection;
      return {
        title: title,
        subtitle: location ? `Location: ${location}` : 'No location specified',
      };
    },
  },
});
