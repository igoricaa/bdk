import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Section subtitle text',
      validation: (rule) =>
        rule
          .required()
          .error('Subtitle is required')
          .max(20)
          .warning('Keep subtitle under 20 characters'),
    }),
    defineField({
      name: 'animatedText',
      title: 'Animated Text',
      type: 'string',
      description: 'Text that will be animated on the frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Main description content for the about section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the call-to-action button',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundIllustration',
      title: 'Background Illustration',
      type: 'image',
      description: 'Background illustration or decorative image',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'subtitle',
      subtitle: 'description',
      media: 'backgroundIllustration',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'About Section',
        media,
      };
    },
  },
});
