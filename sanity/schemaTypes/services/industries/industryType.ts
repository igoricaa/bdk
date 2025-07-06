import { defineField, defineType } from 'sanity';
import { Book, BriefcaseIcon } from 'lucide-react';
import { testimonialsArrayField } from '../testimonialTypes';

export const industryType = defineType({
  name: 'industry',
  title: 'Industry',
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
    testimonialsArrayField,
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
      description: 'Select up to 4 specific posts for the newsroom section',
      validation: (rule) =>
        rule.max(4).error('Maximum 4 newsroom posts allowed'),
    }),
    defineField({
      name: 'latestBlogPosts',
      title: 'Latest Blog Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: `_type == "category" && (name == "Blog" || count(parent[_ref in *[_type=="category" && name=="Blog"]._id]) > 0)`,
          },
        },
      ],
      group: 'relatedPosts',
      description:
        'Select blog categories to show latest posts from those categories',
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
      description:
        'Select insight categories to show latest posts from those categories',
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
