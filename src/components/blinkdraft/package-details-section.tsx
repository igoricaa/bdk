import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import Section from '../ui/section';
import { SimpleAccordionWithScroll } from '../ui/accordions/simple-accordion-with-scroll';

const PackageDetailsSection = ({
  heading,
  description,
  packageDetails,
  locale,
}: {
  heading: string;
  description: string;
  packageDetails: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['packageDetailsSection']['packages'];
  locale: string;
}) => {
  if (!packageDetails) return null;

  const partialHref = `/blinkdraft/${locale}/subscribe?subType=package`;

  return (
    <Section
      variant='light'
      underColor='bg-dark-blue'
      className='flex flex-col xl:flex-row gap-8 xl:gap-26 2xl:gap-42'
    >
      <div className='flex flex-col gap-5 xl:gap-10 2xl:gap-15'>
        <h2 className='text-dark-blue whitespace-nowrap text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
          {heading}
        </h2>
        <p className='text-grey-text text-lg 2xl:text-2xl'>{description}</p>
      </div>

      <SimpleAccordionWithScroll
        items={packageDetails.map((packageDetail) => ({
          title: packageDetail.title,
          description: packageDetail.features?.map(
            (feature) => feature.text
          ) as string[],
        }))}
        partialHref={partialHref}
      />
    </Section>
  );
};

export default PackageDetailsSection;
