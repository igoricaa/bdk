import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import Section from '../ui/section';
import Subtitle from '../ui/subtitle';
import IconButton from '../ui/buttons/icon-button';
import CheckmarkIcon from '../ui/icons/checkmark-icon';

const SubscriptionsSection = ({
  heading,
  subscriptionPlans,
  locale,
}: {
  heading: string;
  subscriptionPlans: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['subscriptionPlansSection']['subscriptionPlans'];
  locale: string;
}) => {
  return (
    <Section variant='blue'>
      <h2 className='text-dark-blue whitespace-nowrap text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
        {heading}
      </h2>
      <div className='mt-8 sm:mt-11 2xl:mt-12 grid auto-rows-fr grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-8 xl:gap-9'>
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionPlanCard
            key={plan._key}
            subscriptionPlan={plan}
            index={index}
            locale={locale}
          />
        ))}
      </div>
    </Section>
  );
};

export default SubscriptionsSection;

const SubscriptionPlanCard = ({
  subscriptionPlan,
  index,
  locale,
}: {
  subscriptionPlan: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['subscriptionPlansSection']['subscriptionPlans'][number];
  index: number;
  locale: string;
}) => {
  const href = `/blinkdraft/${locale}/subscribe?subType=${subscriptionPlan.title.includes('Full') ? 'full' : subscriptionPlan.title.includes('Package') ? 'package' : 'individual'}`;

  return (
    <article className='bg-white flex flex-col sm:flex-row xl:flex-col gap-5 sm:gap-8 md:gap-12 xl:gap-6 2xl:gap-10 rounded-br-[50px] pl-4 pr-6 pt-7.5 pb-9 sm:px-6 sm:py-7.5 xl:pb-9 2xl:py-14 2xl:px-9.5'>
      <div>
        <Subtitle variation={index === 1 ? 'blue' : 'dark'}>
          {subscriptionPlan.note}
        </Subtitle>
        <h3 className='xl:min-h-24 2xl:min-h-25 text-dark-blue text-2xl sm:text-xl xl:text-3xl 2xl:text-4xl leading-none mt-5 xl:mt-6 2xl:mt-10 max-w-7/10'>
          {subscriptionPlan.title}
        </h3>
      </div>
      <div className='h-full flex flex-col gap-6 sm:gap-12 '>
        <ul className='columns-1 sm:columns-2 xl:columns-1 space-y-4 xl:space-y-8'>
          {subscriptionPlan.features.map((feature) => (
            <li key={feature._key} className='flex gap-3.5 2xl:gap-4'>
              <CheckmarkIcon className='mt-1.5 sm:mt-1 xl:mt-0' />
              <p className='text-grey-text leading-snug text-sm sm:text-base xl:text-lg 2xl:text-2xl'>
                {feature.description}
              </p>
            </li>
          ))}
        </ul>

        <IconButton
          href={href}
          pageName='Subscribe to Blinkdraft'
          text='Subscribe'
          className='mt-auto w-fit'
          locale={locale}
        />
      </div>
    </article>
  );
};
