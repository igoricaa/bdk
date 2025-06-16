import { defineField, defineType } from 'sanity';

export const blinkdraftType = defineType({
  name: 'blinkdraft',
  title: 'Blinkdraft',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Blinkdraft logo',
      validation: (rule) => rule.required(),
    }),
  ],
});
