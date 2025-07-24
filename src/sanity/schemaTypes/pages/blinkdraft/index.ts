import { defineField, defineType } from 'sanity';
import { blinkdraftCtaSectionType } from './blinkdraftCtaSection';
import { blinkdraftDemoSectionType } from './blinkdraftDemoSection';
import { blinkdraftHeroSectionType } from './blinkdraftHeroSection';
import { blinkdraftPackageDetailsSectionType } from './blinkdraftPackageDetailsSection';
import { blinkdraftSubscriptionPlansSectionType } from './blinkdraftSubscriptionPlansSection';
import { blinkdraftWhatIsSectionType } from './blinkdraftWhatIsSection';
import { blinkdraftSubscriptionPlanType } from './blinkdraftSubscriptionPlan';
import { blinkdraftAdditionalFeaturesSectionType } from './blinkdraftAdditionalFeaturesSection';
import { contactUsFormType } from './contactUsForm';

export const blinkdraftType = defineType({
  name: 'blinkdraft',
  title: 'Blinkdraft Page',
  type: 'document',
  fields: [
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
      name: 'heroSection',
      title: 'Hero Section',
      type: blinkdraftHeroSectionType.name,
      description: 'Hero section at the top of the page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoSection',
      title: 'Demo Section',
      type: blinkdraftDemoSectionType.name,
      description: 'Demo section with video',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatIsSection',
      title: 'What Is Section',
      type: blinkdraftWhatIsSectionType.name,
      description: 'What is section with title and description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscriptionPlansSection',
      title: 'Subscription Plans Section',
      type: blinkdraftSubscriptionPlansSectionType.name,
      description: 'Subscription plans section with title and description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: blinkdraftCtaSectionType.name,
      description: 'Call to action section with heading and button text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'packageDetailsSection',
      title: 'Package Details Section',
      type: blinkdraftPackageDetailsSectionType.name,
      description:
        'Section with package details, including heading, description, and a list of packages',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'additionalFeaturesSection',
      title: 'Additional Features Section',
      type: blinkdraftAdditionalFeaturesSectionType.name,
      description:
        'Section with additional features, including a title and a list of features',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactUsFormModal',
      title: 'Contact Us Form Modal',
      type: contactUsFormType.name,
      description: 'Contact us form with title and contact details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
});

export {
  blinkdraftCtaSectionType,
  blinkdraftDemoSectionType,
  blinkdraftHeroSectionType,
  blinkdraftSubscriptionPlansSectionType,
  blinkdraftWhatIsSectionType,
  blinkdraftSubscriptionPlanType,
  blinkdraftPackageDetailsSectionType,
  blinkdraftAdditionalFeaturesSectionType,
  contactUsFormType,
};
