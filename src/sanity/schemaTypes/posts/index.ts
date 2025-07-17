import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modified',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'publish' },
          { title: 'Future', value: 'future' },
          { title: 'Draft', value: 'draft' },
          { title: 'Pending', value: 'pending' },
          { title: 'Private', value: 'private' },
          { title: 'Trash', value: 'trash' },
          { title: 'Auto-Draft', value: 'auto-draft' },
          { title: 'Inherit', value: 'inherit' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredMedia',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'sticky', type: 'boolean' }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
          options: {
            searchFields: ['lawyer.name', 'customAuthor.name'],
          },
        },
      ],

      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'publications',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
        }),
        defineField({
          name: 'download',
          type: 'file',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      media: 'featuredMedia',
    },
    prepare({ title, authors, media }) {
      return {
        title,
        media,
      };
    },
  },
});
