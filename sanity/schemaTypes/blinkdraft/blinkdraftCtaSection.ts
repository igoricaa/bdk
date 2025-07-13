
import { defineField, defineType } from 'sanity';

export const blinkdraftCtaSectionType = defineType({
  name: 'blinkdraftCtaSection',
  title: 'Blinkdraft CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the CTA section (H1)',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text to display on the CTA button',
      validation: (rule) => rule.required().error('Button text is required'),
    }),
  ],
}); 