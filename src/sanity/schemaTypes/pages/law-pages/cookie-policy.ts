import { defineField, defineType } from 'sanity';
import { tableSectionType } from './table-section';

export const cookiePolicyType = defineType({
  name: 'cookiePolicy',
  title: 'Cookie Policy',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'necessaryCookies',
      title: 'Necessary Cookies',
      type: tableSectionType.name,
    }),
    defineField({
      name: 'functionalCookies',
      title: 'Functional Cookies',
      type: tableSectionType.name,
    }),
    defineField({
      name: 'analyticsCookies',
      title: 'Analytics Cookies',
      type: tableSectionType.name,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updated: '_updatedAt',
    },
    prepare({ title, updated }) {
      return {
        title,
        subtitle: `Last updated on: ${new Date(updated).toLocaleDateString()}`,
      };
    },
  },
});
