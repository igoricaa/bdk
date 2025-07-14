import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const blinkdraftHeroSectionType = defineType({
  name: 'blinkdraftHeroSection',
  title: 'Blinkdraft Hero Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main hero heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      description: 'CTA buttons with text',
      fields: [
        defineField({
          name: 'requestFreeTrialButton',
          title: 'Request a Free Trial Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (rule) => rule.required(),
              initialValue: 'Request a Free Trial',
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subscribeButton',
          title: 'Subscribe Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (rule) => rule.required(),
              initialValue: 'Subscribe',
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Blinkdraft Hero Section',
      };
    },
  },
});
