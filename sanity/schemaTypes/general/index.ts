import { defineArrayMember, defineField, defineType } from 'sanity';

export const generalInfoType = defineType({
  name: 'generalInfo',
  title: 'General Information',
  type: 'document',
  groups: [
    {
      name: 'branding',
      title: 'Branding',
    },
    {
      name: 'social',
      title: 'Social Media',
    },
    {
      name: 'locations',
      title: 'Locations',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'General Information',
      description: 'Internal document title (hidden from public)',
      validation: (rule) => rule.required().error('Document title is required'),
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      title: 'Company logo',
      type: 'image',
      description: 'Main company or organization logo',
      validation: (rule) => rule.required().error('Company logo is required'),
      group: 'branding',
    }),
    defineField({
      name: 'socials',
      title: 'Social media profiles',
      type: 'array',
      description: 'Links to social media profiles and platforms',
      of: [defineArrayMember({ type: 'social' })],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('At least one social media profile is required'),
      group: 'social',
    }),
    defineField({
      name: 'countries',
      title: 'Office locations',
      type: 'array',
      description: 'Company offices, branches, or service locations',
      of: [defineArrayMember({ type: 'country' })],
      validation: (rule) =>
        rule.required().min(1).error('At least one location is required'),
      group: 'locations',
    }),
  ],
  validation: (rule) =>
    rule.required().error('General information is required'),
  preview: {
    select: {
      title: 'title',
      media: 'logo',
      socialsCount: 'socials',
      countriesCount: 'countries',
    },
    prepare({ title, media, socialsCount, countriesCount }) {
      const socialCount = Array.isArray(socialsCount) ? socialsCount.length : 0;
      const locationCount = Array.isArray(countriesCount)
        ? countriesCount.length
        : 0;

      return {
        title: title || 'General Information',
        subtitle: `${socialCount} social profiles • ${locationCount} locations`,
        media: media,
      };
    },
  },
});
