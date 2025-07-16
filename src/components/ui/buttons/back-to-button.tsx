import { TransitionLink } from '@/src/components/transition-link';
import ArrowLeft from '../arrow-left';
import { cn } from '@/src/lib/utils';

const BackToButton = ({
  href,
  onClick,
  text,
  className,
  iconClassName,
  iconStrokeColor,
  variant = 'light',
}: {
  href?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  iconClassName?: string;
  iconStrokeColor?: string;
  variant?: 'light' | 'dark';
}) => {
  const sharedClasses =
    'flex items-center gap-3.5 w-fit h-fit text-dark-blue cursor-pointer group';

  return (
    <>
      {href && (
        <TransitionLink href={href} className={cn(sharedClasses, className)}>
          <ArrowLeft
            className={cn(iconClassName)}
            strokeColor={iconStrokeColor}
            variant={variant}
          />
          {text}
        </TransitionLink>
      )}
      {onClick && (
        <button onClick={onClick} className={cn(sharedClasses, className)}>
          <ArrowLeft
            className={cn(iconClassName)}
            strokeColor={iconStrokeColor}
            variant={variant}
          />
          {text}
        </button>
      )}
    </>
  );
};

export default BackToButton;
