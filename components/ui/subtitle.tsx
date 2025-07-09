import { cn } from '@/lib/utils';

const Subtitle = ({
  className,
  variation = 'light',
  children,
}: {
  className?: string;
  variation?: 'light' | 'dark';
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        className,
        variation === 'light' ? ' bg-white/10' : 'bg-dark-blue',
        'text-white text-sm rounded-[500px] w-fit flex items-center justify-center h-7.5 2xl:h-10 px-4 2xl:px-5'
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
