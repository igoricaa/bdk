import { cn } from '@/lib/utils';

const Section = ({
  children,
  variant = 'dark',
  underColor = 'bg-white',
  className,
}: {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'blue';
  underColor?: string;
  className?: string;
}) => {
  return (
    <section className={cn('bg-white', underColor)}>
      <div
        className={cn(
          'rounded-t-main py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43 px-side',
          className,
          variant === 'dark' && 'bg-dark-blue text-white',
          variant === 'light' && 'bg-white text-dark-blue',
          variant === 'blue' && 'bg-light-blue-bg text-dark-blue'
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
