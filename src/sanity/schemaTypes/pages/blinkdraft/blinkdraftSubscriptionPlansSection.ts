import { UsersIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const blinkdraftSubscriptionPlansSectionType = defineType({
  name: 'blinkdraftSubscriptionPlansSection',
  title: 'Blinkdraft Subscription Plans Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main subscription plans heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscriptionPlans',
      title: 'Subscription Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'blinkdraftSubscriptionPlan',
        }),
      ],
      description:
        'Subscription plans section with title and description (exactly 3 plans required)',
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(3)
          .error('Exactly 3 subscription plans are required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Blinkdraft Subscription Plans Section',
      };
    },
  },
});
