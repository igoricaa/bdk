import { Link } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const socialType = defineType({
  name: 'social',
  title: 'Social Media',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'name',
      title: 'Platform name',
      type: 'string',
      description: 'Name of the social media platform',
      validation: (rule) => rule.required().error('Platform name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier generated from platform name',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (rule) =>
        rule.required().error('Slug is required for URL generation'),
    }),
    defineField({
      name: 'icon',
      title: 'Platform icon',
      type: 'image',
      description: 'Select the social media platform icon',
      validation: (rule) =>
        rule.required().error('Platform icon selection is required'),
    }),
    defineField({
      name: 'link',
      title: 'Profile link',
      type: 'url',
      description: 'Full URL to your social media profile',
      validation: (rule) =>
        rule
          .required()
          .error('Profile link is required')
          .uri({
            scheme: ['http', 'https'],
          }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: title || 'Untitled social',
        subtitle: subtitle || 'No link provided',
      };
    },
  },
});
