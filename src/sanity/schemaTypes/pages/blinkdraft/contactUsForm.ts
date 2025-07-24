import { defineField, defineType } from 'sanity';

export const contactUsFormType = defineType({
  name: 'contactUsForm',
  title: 'Contact Us Form',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
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
          title: 'Fields Labels',
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
              name: 'message',
              title: 'Message',
              type: 'string',
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
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Us Form',
      };
    },
  },
});
