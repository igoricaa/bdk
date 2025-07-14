import { defineArrayMember, defineField, defineType } from 'sanity';

export const blinkdraftAdditionalFeaturesSectionType = defineType({
  name: 'blinkdraftAdditionalFeaturesSection',
  title: 'Blinkdraft Additional Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the additional features section',
      validation: (rule) => rule.required().error('Section title is required'),
    }),
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title of the additional feature',
              validation: (rule) =>
                rule.required().error('Feature title is required'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Description of the additional feature',
              validation: (rule) =>
                rule.required().error('Feature description is required'),
            }),
          ],
        }),
      ],
      validation: (rule) =>
        rule.min(1).error('At least one additional feature is required'),
    }),
  ],
});
