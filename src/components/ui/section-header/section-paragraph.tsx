import { cn } from '@/src/lib/utils';

const SectionParagraph = ({
  children,
  colorVariant = 'light',
  className,
}: {
  children: React.ReactNode;
  colorVariant?: 'light' | 'dark';
  className?: string;
}) => {
  return (
    <p
      className={cn(
        'md:text-end xl:text-lg 2xl:text-2xl leading-snug',
        colorVariant === 'light' ? 'text-lightest-blue' : 'text-grey-text',
        className
      )}
    >
      {children}
    </p>
  );
};

export default SectionParagraph;
