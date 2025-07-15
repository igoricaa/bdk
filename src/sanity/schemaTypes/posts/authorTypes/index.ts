import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Author Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lawyer', value: 'lawyer' },
          { title: 'Custom Author', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
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
      name: 'url',
      title: 'URL (for Custom Authors)',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'custom',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'lawyer.picture',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'No name',
        subtitle: subtitle
          ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1)
          : '',
        media: subtitle === 'lawyer' ? media : UserIcon,
      };
    },
  },
});
