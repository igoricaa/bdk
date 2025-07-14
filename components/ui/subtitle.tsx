import { cn } from '@/lib/utils';

const Subtitle = ({
  className,
  variation = 'light',
  children,
}: {
  className?: string;
  variation?: 'light' | 'dark' | 'blue';
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        className,
        variation === 'light'
          ? ' bg-white/10'
          : variation === 'dark'
            ? 'bg-dark-blue'
            : 'bg-light-blue',
        'text-white text-sm rounded-[500px] w-fit flex items-center justify-center min-h-7.5 h-7.5 2xl:min-h-10 2xl:h-10 px-4 2xl:px-5'
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
