import { UsersIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const blinkdraftWhatIsSectionType = defineType({
  name: 'blinkdraftWhatIsSection',
  title: 'Blinkdraft What Is Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main what is heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      description: 'What is section with title and description',
      validation: (rule) => rule.min(1).required().error('At least one feature is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Blinkdraft What Is Section',
      };
    },
  },
});
