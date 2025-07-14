import { defineField } from 'sanity';

// TypeScript interface for testimonials
export interface Testimonial {
  text: string;
  author: string;
}

// Shared testimonial field definition for reuse in schemas
export const testimonialField = defineField({
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
});

// Shared testimonials array field definition
export const testimonialsArrayField = defineField({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'array',
  of: [testimonialField],
});
