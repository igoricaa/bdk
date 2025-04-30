// import {ComposeIcon} from '@sanity/icons'
import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  //   icon: ComposeIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug' }),
    defineField({ name: 'date', type: 'datetime' }),
    defineField({ name: 'modified', type: 'datetime' }),
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
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'excerpt',
      type: 'portableText',
    }),
    defineField({ name: 'featuredMedia', type: 'image' }),
    defineField({ name: 'sticky', type: 'boolean' }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
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
      // const authorNames =
      //   authors
      //     ?.map((author: any) => {
      //       if (author.type === 'lawyer') {
      //         return author.lawyer?.name || 'No name advokat';
      //       }
      //       return author.customAuthor?.name || 'No name autor';
      //     })
      //     .filter(Boolean)
      //     .join(', ') || 'No authors';

      return {
        title,
        // subtitle: authorNames,
        media,
      };
    },
  },
});
