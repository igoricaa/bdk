import { Earth } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const countryType = defineType({
  name: 'country',
  title: 'Country/Location',
  type: 'object',
  icon: Earth,
  fields: [
    defineField({
      name: 'name',
      title: 'Country name',
      type: 'string',
      description: 'Name of the country',
      validation: (rule) => rule.required().error('Location name is required'),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'blockContent',
      description: 'Full physical address for this country',
      validation: (rule) => rule.required().error('Address is required'),
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'email',
      description: 'Primary contact email for this country',
      validation: (rule) => rule.required().error('Contact email is required'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'Contact phone number (optional)',
      validation: (rule) =>
        rule.custom((phone) => {
          if (!phone) return true; // Optional field
          // Basic phone validation - allows various formats
          const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,20}$/;
          return phoneRegex.test(phone) || 'Please enter a valid phone number';
        }),
    }),
    defineField({
      name: 'note',
      title: 'Additional notes',
      type: 'text',
      description:
        'Optional notes or additional information about this country',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      email: 'email',
    },
    prepare({ title, email }) {
      return {
        title: title || 'Untitled country',
        subtitle: email || 'No address provided',
      };
    },
  },
});
