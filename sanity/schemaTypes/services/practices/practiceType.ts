import { defineField, defineType } from 'sanity';
import { Book, BriefcaseIcon } from 'lucide-react';

export const practiceType = defineType({
  name: 'practice',
  title: 'Practice',
  icon: BriefcaseIcon,
  type: 'document',
  groups: [
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      icon: Book,
    },
  ],
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
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'text',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle?.slice(0, 50) + '...',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'lawyers',
      title: 'Lawyers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'lawyer' }] }],
      validation: (rule) =>
        rule.required().min(1).error('At least one lawyer must be assigned'),
    }),
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: `_type == "category" && (name == "Publications" || count(parent[_ref in *[_type=="category" && name=="Publications"]._id]) > 0)`,
          },
        },
      ],
      group: 'relatedPosts',
      description: 'Select the Publications category and its child categories',
    }),
    defineField({
      name: 'newsroom',
      title: 'Newsroom',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
          options: {
            filter:
              'count(categories[_ref in *[_type=="category" && name=="Newsroom"]._id]) > 0',
          },
        },
      ],
      group: 'relatedPosts',
      description: 'Select posts for the newsroom section',
    }),
    defineField({
      name: 'latestBlogPost',
      title: 'Latest Blog Post',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'relatedPosts',
      description: 'Select categories for latest blog posts',
    }),
    defineField({
      name: 'bdkInsights',
      title: 'BDK Insights',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: `_type == "category" && (name == "Insights" || count(parent[_ref in *[_type=="category" && name=="Insights"]._id]) > 0)`,
          },
        },
      ],
      group: 'relatedPosts',
      description: 'Select categories for BDK Insights',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lawyers: 'lawyers',
    },
    prepare({ title, lawyers = [] }) {
      const lawyerCount = Array.isArray(lawyers) ? lawyers.length : 0;
      return {
        title,
        subtitle: lawyerCount
          ? `Assigned to ${lawyerCount} lawyer${lawyerCount > 1 ? 's' : ''}`
          : 'No lawyers assigned',
      };
    },
  },
});
