import { defineArrayMember, defineField, defineType } from 'sanity';

export const blinkdraftSubscriptionPlanType = defineType({
  name: 'blinkdraftSubscriptionPlan',
  title: 'Blinkdraft Subscription Plan',
  type: 'object',
  fields: [
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1).required().error('At least one feature is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Blinkdraft Subscription Plan' };
    },
  },
});
