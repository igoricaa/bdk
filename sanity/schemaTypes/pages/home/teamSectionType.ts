import { defineField, defineType } from 'sanity';
import { UsersIcon } from 'lucide-react';

export const teamSectionType = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the team section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text for the team section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Team Section',
      };
    },
  },
});
