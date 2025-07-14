import { defineArrayMember, defineField, defineType } from 'sanity';

export const blinkdraftPackageDetailsSectionType = defineType({
  name: 'blinkdraftPackageDetailsSection',
  title: 'Blinkdraft Package Details Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the package details section (H1)',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description for the package details section',
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title of the package',
              validation: (rule) =>
                rule.required().error('Package title is required'),
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      description: 'Text for the feature',
                      validation: (rule) =>
                        rule.required().error('Feature text is required'),
                    }),
                  ],
                }),
              ],
              validation: (rule) =>
                rule
                  .min(1)
                  .error('At least one feature is required for the package'),
            }),
          ],
        }),
      ],
      validation: (rule) =>
        rule.min(1).error('At least one package is required'),
    }),
  ],
});
