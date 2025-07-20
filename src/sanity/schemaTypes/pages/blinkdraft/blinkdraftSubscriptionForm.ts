import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subscriptionForm',
  title: 'Subscription Form',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscriptionType',
      title: 'Subscription Type Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'options',
          title: 'Options',
          type: 'object',
          fields: [
            defineField({
              name: 'full',
              title: 'Full Subscription Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'package',
              title: 'Document Package Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'individual',
              title: 'Individual Templates Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'packageChoice',
      title: 'Package Choice Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'options',
          title: 'Options',
          type: 'object',
          fields: [
            defineField({
              name: 'amendments',
              title: 'Amendments Package Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'compliance',
              title: 'Compliance Package Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'breaks',
              title: 'Breaks Package Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'hiring',
              title: 'Hiring Package Option',
              type: 'string',
            }),
            defineField({
              name: 'termination',
              title: 'Termination Package Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'languageVersion',
      title: 'Language Version Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'options',
          title: 'Options',
          type: 'object',
          fields: [
            defineField({
              name: 'bilingual',
              title: 'Bilingual Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'serbian',
              title: 'Serbian Option',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'fields',
          title: 'Field Labels',
          type: 'object',
          fields: [
            defineField({
              name: 'firstName',
              title: 'First Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'familyName',
              title: 'Family Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'companyAddress',
              title: 'Company Address',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'numUsers',
              title: 'Number of Users',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'individualTemplates',
      title: 'Individual Templates Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'templateGroups',
          title: 'Template Groups (e.g., Corporate, Employment)',
          type: 'array',
          of: [
            {
              name: 'templateGroup',
              title: 'Template Group',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Group Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'templateSubgroups',
                  title: 'Template Subgroups',
                  type: 'array',
                  of: [
                    {
                      name: 'templateSubgroup',
                      title: 'Template Subgroup',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'title',
                          title: 'Subgroup Title',
                          type: 'string',
                          validation: (rule) => rule.required(),
                        }),
                        defineField({
                          name: 'templateItems',
                          title: 'Template Items',
                          type: 'array',
                          of: [
                            {
                              name: 'templateItem',
                              title: 'Template Item',
                              type: 'string',
                              validation: (rule) => rule.required(),
                            },
                          ],
                          validation: (rule) => rule.required(),
                        }),
                      ],
                      validation: (rule) => rule.required(),
                    },
                  ],
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            },
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  validation: (rule) => rule.required(),
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Subscription Form Content',
      };
    },
  },
});
