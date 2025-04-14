import { defineField, defineType } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  icon: BriefcaseIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'text',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle?.slice(0, 50) + '...',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'lawyer',
      title: 'Lawyer',
      type: 'reference',
      to: [{ type: 'lawyer' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lawyer: 'lawyer.firstName',
    },
    prepare({ title, lawyer }) {
      return {
        title,
        subtitle: lawyer ? `Assigned to: ${lawyer}` : 'No lawyer assigned',
      };
    },
  },
});