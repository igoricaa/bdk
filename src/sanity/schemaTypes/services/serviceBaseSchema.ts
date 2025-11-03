import { defineField } from 'sanity';
import { Book, Monitor } from 'lucide-react';
import { testimonialsArrayField } from './testimonialTypes';

export const serviceBaseGroups = [
  {
    name: 'illustrations',
    title: 'Illustrations',
    icon: Monitor,
  },
  {
    name: 'relatedPosts',
    title: 'Related Posts',
    icon: Book,
  },
];

export const serviceBaseFields = [
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
    name: 'relatedExpertise',
    title: 'Related Expertise',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [
          { type: 'practice' },
          { type: 'industry' },
          { type: 'foreignDesk' },
        ],
        options: {
          filter: ({ document }) => {
            return {
              filter: '_id != $currentId',
              params: {
                currentId: document._id,
              },
            };
          },
        },
      },
    ],
    description:
      'Select related services from practices, industries, or foreign desks',
  }),
  defineField({
    name: 'illustration',
    title: 'Illustration',
    type: 'illustration',
    group: 'illustrations',
    validation: (rule) => rule.required(),
  }),
  testimonialsArrayField,
  defineField({
    name: 'lawyers',
    title: 'Lawyers',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'lawyer' }] }],
  }),
  defineField({
    name: 'contactEmail',
    title: 'Contact Email',
    type: 'email',
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
];

export const serviceBasePreview = {
  select: {
    title: 'title',
    lawyers: 'lawyers',
  },
  prepare({ title, lawyers = [] }: { title?: string; lawyers?: any[] }) {
    const lawyerCount = Array.isArray(lawyers) ? lawyers.length : 0;
    return {
      title: title || 'Untitled',
      subtitle: lawyerCount
        ? `Assigned to ${lawyerCount} lawyer${lawyerCount > 1 ? 's' : ''}`
        : 'No lawyers assigned',
    };
  },
};
