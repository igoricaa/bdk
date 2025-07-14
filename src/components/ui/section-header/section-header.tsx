import { cn } from '@/src/lib/utils';
import SectionHeading from './section-heading';
import SectionParagraph from './section-paragraph';
import Subtitle from '../subtitle';
import { memo } from 'react';

interface SectionHeaderProps {
  heading: string;
  description?: string;
  subtitle?: string;
  rightSideComponent?: React.ReactNode;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  rightSideComponentClassName?: string;
  colorVariant?: 'dark' | 'light';
}

const SectionHeader = ({
  heading,
  description,
  subtitle,
  rightSideComponent,
  className,
  headingClassName,
  descriptionClassName,
  rightSideComponentClassName,
  colorVariant = 'light',
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-4 md:items-end md:justify-between',
        className,
        rightSideComponent && 'md:items-center'
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

      {description && (
        <SectionParagraph
          colorVariant={colorVariant}
          className={descriptionClassName}
        >
          {description}
        </SectionParagraph>
      )}

      {rightSideComponent && (
        <div className={cn(rightSideComponentClassName)}>
          {rightSideComponent}
        </div>
      )}
    </div>
  );
};

export default memo(SectionHeader);
