import { defineField, defineType } from 'sanity';

export const tableSectionType = defineType({
  name: 'tableSection',
  title: 'Table Section',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'table',
      title: 'Table',
      type: 'table',
      validation: (rule) => rule.required(),
    }),
  ],
});
