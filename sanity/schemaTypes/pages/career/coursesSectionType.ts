import { defineField, defineType } from 'sanity';
import { Briefcase } from 'lucide-react';

export const coursesSectionType = defineType({
  name: 'coursesSection',
  title: 'Programmes and Courses Section',
  type: 'object',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle for the courses section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error('Title is required')
          .max(100)
          .warning('Keep title under 100 characters for better display'),
    }),
    defineField({
      name: 'courses',
      title: 'Programmes and Courses',
      type: 'array',
      of: [
        defineField({
          name: 'course',
          title: 'Programme or Course',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'pdfFile',
              title: 'PDF File',
              type: 'file',
              description: 'Programme or Course PDF',
              options: {
                accept: '.pdf',
              },
            }),
          ],
        }),
      ],
      description:
        'List of programmes and courses to display on the career page',
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
