import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import Section from '../ui/section';
import IconButton from '../ui/buttons/icon-button';
import CheckmarkIcon from '../ui/icons/checkmark-icon';

const AdditionalFeaturesSection = ({
  heading,
  features,
}: {
  heading: string;
  features: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['additionalFeaturesSection']['additionalFeatures'];
}) => {
  return (
    <Section variant='blue'>
      <h2 className='text-dark-blue whitespace-nowrap text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
        {heading}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-5 xl:gap-8 2xl:gap-10 mt-8 xl:mt-11 2xl:mt-15'>
        {features?.map((feature, index) => {
          const borderRadius =
            index === 0 || index === 3
              ? 'rounded-bl-[2.5rem] md:rounded-bl-[30px] xl:rounded-bl-[50px] rounded-tr-[2.5rem] md:rounded-tr-[30px] xl:rounded-tr-[50px]'
              : 'rounded-tl-[2.5rem] md:rounded-tl-[30px] xl:rounded-tl-[50px] rounded-br-[2.5rem] md:rounded-br-[30px] xl:rounded-br-[50px]';

          return (
            <AdditionalFeatureCard
              key={feature._key}
              title={feature.title}
              description={feature.description}
              className={borderRadius}
            />
          );
        })}
      </div>

      <IconButton
        href='#'
        text='Contact Us'
        className='w-fit mt-18 xl:mt-12 2xl:mt-35 mx-auto'
      />
    </Section>
  );
};

export default AdditionalFeaturesSection;

const AdditionalFeatureCard = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) => {
  return (
    <article
      className={`bg-white flex gap-4 md:gap-6 xl:gap-8 2xl:gap-10 p-5 ${className}`}
    >
      <CheckmarkIcon
        className='md:max-xl:hidden bg-transparent min-w-15 min-h-15 size-15 lg:min-w-21 lg:min-h-21 lg:size-21 border border-light-blue'
        checkmarkClassName='text-light-blue size-7 lg:size-14'
      />
      <div className='flex flex-col gap-2.5 md:gap-6'>
        <div className='flex items-center gap-6'>
          <CheckmarkIcon
            className='hidden md:max-xl:flex bg-transparent md:min-w-15 md:min-h-15 md:size-15 border border-light-blue'
            checkmarkClassName='text-light-blue md:size-7'
          />
          <h3 className='text-dark-blue text-xl xl:text-2xl 2xl:text-3xl'>
            {title}
          </h3>
        </div>
        <p className='text-grey-text text-sm md:text-base xl:text-lg 2xl:text-2xl leading-snug'>
          {description}
        </p>
      </div>
    </article>
  );
};
