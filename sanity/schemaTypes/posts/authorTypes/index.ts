import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Author Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lawyer', value: 'lawyer' },
          { title: 'Custom Author', value: 'custom' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lawyer',
      title: 'Lawyer',
      type: 'reference',
      to: [{ type: 'lawyer' }],
      hidden: ({ document }) => document?.type !== 'lawyer',
    }),
    defineField({
      name: 'customAuthor',
      title: 'Custom Author Details',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'slug',
          type: 'slug',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
      hidden: ({ document }) => document?.type !== 'custom',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      lawyer: 'lawyer.name',
      customName: 'customAuthor.name',
    },
    prepare(selection) {
      if (selection.type === 'lawyer') {
        return {
          title: selection.lawyer,
          subtitle: 'Lawyer',
          media: UserIcon,
        };
      }
      return {
        title: selection.customName,
        subtitle: 'Custom Author',
      };
    },
  },
});
