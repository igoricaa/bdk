import { FilterIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FilterIcon,
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
    defineField({
      name: 'parent',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Parent category (if any)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'count',
      type: 'number',
      readOnly: true,
      description: 'Number of posts in the category (auto-updated)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      count: 'count',
    },
    prepare({ title, subtitle, count }) {
      return {
        title,
        subtitle:
          count !== undefined ? `${subtitle} (${count} posts)` : subtitle,
      };
    },
  },
});
