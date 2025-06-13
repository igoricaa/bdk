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
        'text-white text-sm px-5 py-3 rounded-full w-fit'
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
