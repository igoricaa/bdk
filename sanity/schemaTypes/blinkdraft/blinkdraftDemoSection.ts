import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const blinkdraftDemoSectionType = defineType({
  name: 'blinkdraftDemoSection',
  title: 'Blinkdraft Demo Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main demo heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video',
      type: 'mux.video',
      description: 'Demo video that will be displayed in the demo section',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Blinkdraft Demo Section',
      };
    },
  },
});
