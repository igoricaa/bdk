import { defineField, defineType } from 'sanity';

export const blinkdraftType = defineType({
  name: 'blinkdraft',
  title: 'Blinkdraft',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Blinkdraft logo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the blinkdraft page (not displayed on frontend)',
      initialValue: 'Blinkdraft Page',
      validation: (rule) => rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'blinkdraftHeroSection',
      description: 'Hero section at the top of the page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoSection',
      title: 'Demo Section',
      type: 'blinkdraftDemoSection',
      description: 'Demo section with video',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatIsSection',
      title: 'What Is Section',
      type: 'blinkdraftWhatIsSection',
      description: 'What is section with title and description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscriptionPlansSection',
      title: 'Subscription Plans Section',
      type: 'blinkdraftSubscriptionPlansSection',
      description: 'Subscription plans section with title and description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'blinkdraftCtaSection',
      description: 'Call to action section with heading and button text',
      validation: (rule) => rule.required(),
    }),
  ],
});

export { blinkdraftCtaSectionType } from './blinkdraftCtaSection';
export { blinkdraftDemoSectionType } from './blinkdraftDemoSection';
export { blinkdraftHeroSectionType } from './blinkdraftHeroSection';
export { blinkdraftSubscriptionPlansSectionType } from './blinkdraftSubscriptionPlansSection';
export { blinkdraftWhatIsSectionType } from './blinkdraftWhatIsSection';
export { blinkdraftSubscriptionPlanType } from './blinkdraftSubscriptionPlan';
