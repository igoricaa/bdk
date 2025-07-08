import { defineField, defineType } from 'sanity';
import { ImageIcon } from 'lucide-react';

export const illustrationType = defineType({
  name: 'illustration',
  title: 'Illustration',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'desktop',
      title: 'Desktop',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tablet',
      title: 'Tablet',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      desktop: 'desktop',
      tablet: 'tablet',
      mobile: 'mobile',
    },
    prepare({ desktop, tablet, mobile }) {
      const hasAll = desktop && tablet && mobile;
      return {
        title: 'Illustration',
        subtitle: hasAll
          ? 'All devices configured'
          : 'Missing some device images',
        media: desktop || tablet || mobile,
      };
    },
  },
});
