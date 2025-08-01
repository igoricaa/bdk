import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import Section from '../ui/section';
import CheckmarkIcon from '../ui/icons/checkmark-icon';
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';
import ArrowUpRight from '../ui/arrow-up-right';
import { AnimatedText } from '../ui/animated-text';
import ContactUs from '../contact-us';

const AdditionalFeaturesSection = ({
  heading,
  features,
  contactUsFormModal,
}: {
  heading: string;
  features: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['additionalFeaturesSection']['additionalFeatures'];
  contactUsFormModal: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['contactUsFormModal'];
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='iconButton'
            size='iconButton'
            className={cn(
              'group',
              'cursor-pointer w-fit mt-18 xl:mt-12 2xl:mt-35 mx-auto'
            )}
          >
            <AnimatedText text='Contact Us' />

            <ArrowUpRight
              className='size-9! duration-700'
              arrowClassName='size-8!'
            />
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-lg xl:max-w-xl py-8 '>
          <DialogHeader className='text-left'>
            <DialogTitle className='text-dark-blue text-3xl sm:text-4xl'>
              Contact Us
            </DialogTitle>
            <DialogDescription className='text-dark-blue sm:text-lg md:text-xl'>
              Please fill out the form below to contact us.
            </DialogDescription>
          </DialogHeader>

          <ContactUs formData={contactUsFormModal} className='mt-4 md:mt-5' />
        </DialogContent>
      </Dialog>
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
      className={`bg-white flex gap-4 md:gap-6 xl:gap-8 2xl:gap-10 p-5 xl:py-8 2xl:px-8 2xl:py-10 ${className}`}
    >
      <CheckmarkIcon
        className='md:max-xl:hidden bg-transparent min-w-15 min-h-15 size-15 lg:min-w-21 lg:min-h-21 lg:size-21 2xl:min-w-21 2xl:min-h-21 2xl:size-21 border border-light-blue'
        checkmarkClassName='text-light-blue size-7 lg:size-14 2xl:size-16 2xl:min-w-16 2xl:min-h-16 lg:stroke-[0.5]'
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
