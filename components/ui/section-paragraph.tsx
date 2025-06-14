import { cn } from '@/lib/utils';

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
        'md:text-end xl:text-lg 2xl:text-2xl',
        colorVariant === 'light' ? 'text-lightest-blue' : 'text-[#666666]',
        className
      )}
    >
      {children}
    </p>
  );
};

export default SectionParagraph;
