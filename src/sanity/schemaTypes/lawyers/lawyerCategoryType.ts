import { defineField, defineType, defineArrayMember } from 'sanity';
import { lawyerConfig } from './config';

export const lawyerCategoryType = defineType({
  name: 'lawyerCategory',
  title: 'Lawyer Category',
  type: 'document',
  groups: lawyerConfig.groups,
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
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort categories in the UI',
    }),
    defineField({
      name: 'orderedLawyers',
      title: 'Lawyer Order',
      type: 'array',
      description:
        'Drag and drop to reorder lawyers within this category. Lawyers not listed here will appear at the end in alphabetical order.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'lawyer' }],
          options: {
            filter: ({ document }) => {
              // For existing documents, filter by category
              if (document?._id) {
                const categoryId = document._id.replace('drafts.', '');
                return {
                  filter: 'references($categoryId)',
                  params: { categoryId },
                };
              }
              // For new documents, show all lawyers
              return {};
            },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .unique()
          .warning('Each lawyer should only appear once in the order'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      orderedLawyers: 'orderedLawyers',
    },
    prepare({ title, description, orderedLawyers }) {
      const lawyerCount = orderedLawyers?.length || 0;
      const subtitle =
        lawyerCount > 0
          ? `${description || ''} (${lawyerCount} ordered lawyers)`.trim()
          : description;

      return {
        title,
        subtitle,
      };
    },
  },
});
