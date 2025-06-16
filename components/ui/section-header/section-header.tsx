import { cn } from '@/lib/utils';
import SectionHeading from './section-heading';
import SectionParagraph from './section-paragraph';
import Subtitle from '../subtitle';

const SectionHeader = ({
  heading,
  description,
  subtitle,
  className,
  headingClassName,
  descriptionClassName,
  colorVariant = 'light',
}: {
  heading: string;
  description: string;
  subtitle?: string;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  colorVariant?: 'dark' | 'light';
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-4 md:items-end md:justify-between',
        className
      )}
    >
      {subtitle ? (
        <div>
          <Subtitle variation={colorVariant}>{subtitle}</Subtitle>
          <SectionHeading
            colorVariant={colorVariant}
            className={cn(headingClassName, 'mt-6 md:mt-5 xl:mt-6 2xl:mt-12')}
          >
            {heading}
          </SectionHeading>
        </div>
      ) : (
        <SectionHeading
          colorVariant={colorVariant}
          className={headingClassName}
        >
          {heading}
        </SectionHeading>
      )}

      <SectionParagraph
        colorVariant={colorVariant}
        className={descriptionClassName}
      >
        {description}
      </SectionParagraph>
    </div>
  );
};

export default SectionHeader;
