import { defineField, defineType } from 'sanity';
import { EditIcon } from 'lucide-react';

export const blinkdraftSectionType = defineType({
  name: 'blinkdraftSection',
  title: 'Blinkdraft Section',
  type: 'object',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the blinkdraft section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Description content for the blinkdraft section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Blinkdraft Section',
      };
    },
  },
});
