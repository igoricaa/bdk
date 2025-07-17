import { defineField, defineType } from 'sanity';

export const privacyNoticeType = defineType({
  name: 'privacyNotice',
  title: 'Privacy Notice',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'specificsOfDataProcessing',
      title: 'Specifics of the Data Processing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'table',
              title: 'Table',
              type: 'table',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updated: '_updatedAt',
    },
    prepare({ title, updated }) {
      return {
        title,
        subtitle: `Last updated on: ${new Date(updated).toLocaleDateString()}`,
      };
    },
  },
});
