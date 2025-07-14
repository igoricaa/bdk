import { cn } from '@/src/lib/utils';

const SectionHeading = ({
  children,
  colorVariant = 'light',
  className,
}: {
  children: React.ReactNode;
  colorVariant?: 'light' | 'dark';
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        'text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl',
        colorVariant === 'light' ? 'text-white' : 'text-dark-blue',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
