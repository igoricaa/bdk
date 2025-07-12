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
      name: 'services',
      title: 'Services Category Illustrations',
    },
    {
      name: 'posts',
      title: 'Post Categories Illustrations',
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
      title: 'Logo',
      type: 'object',
      description: 'Main black and white logo',
      validation: (rule) => rule.required().error('Logo is required'),
      group: 'branding',
      fields: [
        defineField({
          name: 'logoBlack',
          title: 'Black logo',
          type: 'image',
          description: 'Black logo',
          validation: (rule) => rule.required().error('Black logo is required'),
        }),
        defineField({
          name: 'logoWhite',
          title: 'White logo',
          type: 'image',
          description: 'White logo',
          validation: (rule) => rule.required().error('White logo is required'),
        }),
      ],
    }),
    defineField({
      name: 'servicesCategoryIllustrations',
      title: 'Services Category Illustrations',
      type: 'object',
      description: 'General illustrations for each service category',
      group: 'services',
      fields: [
        defineField({
          name: 'servicesIllustration',
          title: 'Services (General)',
          type: 'image',
          description: 'General illustration for the overall services category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'practicesIllustration',
          title: 'Practices',
          type: 'image',
          description: 'General illustration for the practices category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'industriesIllustration',
          title: 'Industries',
          type: 'image',
          description: 'General illustration for the industries category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'foreignDesksIllustration',
          title: 'Foreign Desks',
          type: 'image',
          description: 'General illustration for the foreign desks category',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Services category illustrations are required'),
    }),
    defineField({
      name: 'postCategoriesIllustrations',
      title: 'Post Categories Illustrations',
      type: 'object',
      description: 'General illustrations for each main post category',
      group: 'posts',
      fields: [
        defineField({
          name: 'bdknowledgeIllustration',
          title: 'BDKnowledge',
          type: 'image',
          description: 'General illustration for the BDKnowledge category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'blogIllustration',
          title: 'Blog',
          type: 'image',
          description: 'General illustration for the blog category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'digitalWatchIllustration',
          title: 'Digital Watch',
          type: 'image',
          description: 'General illustration for the digital watch category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'insightsIllustration',
          title: 'Insights',
          type: 'image',
          description: 'General illustration for the insights category',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'publicationsIllustration',
          title: 'Publications',
          type: 'image',
          description: 'General illustration for the publications category',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Post categories illustrations are required'),
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
      of: [defineArrayMember({ type: 'reference', to: { type: 'country' } })],
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
      servicesIllustrations: 'servicesCategoryIllustrations',
    },
    prepare({
      title,
      media,
      socialsCount,
      countriesCount,
      servicesIllustrations,
    }) {
      const socialCount = Array.isArray(socialsCount) ? socialsCount.length : 0;
      const locationCount = Array.isArray(countriesCount)
        ? countriesCount.length
        : 0;
      const hasServicesIllustrations = servicesIllustrations
        ? '✓ Services illustrations'
        : '✗ No services illustrations';

      return {
        title: title || 'General Information',
        subtitle: `${socialCount} social profiles • ${locationCount} locations • ${hasServicesIllustrations}`,
        media: media,
      };
    },
  },
});
