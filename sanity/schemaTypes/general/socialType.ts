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
      name: 'icons',
      title: 'Icons',
      type: 'object',
      description: 'Social media icons',
      validation: (rule) => rule.required().error('Icons are required'),
      fields: [
        defineField({
          name: 'iconLight',
          title: 'Light icon',
          type: 'image',
          description: 'Light icon',
          validation: (rule) => rule.required().error('Light icon is required'),
        }),
        defineField({
          name: 'iconDark',
          title: 'Dark icon',
          type: 'image',
          description: 'Dark icon',
          validation: (rule) => rule.required().error('Dark icon is required'),
        }),
      ],
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
      icon: 'icons.iconLight',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: title || 'Untitled social',
        subtitle: subtitle || 'No link provided',
      };
    },
  },
});
