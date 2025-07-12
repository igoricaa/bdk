import { TransitionLink } from '@/components/transition-link';
import ArrowLeft from '../arrow-left';
import { cn } from '@/lib/utils';

const BackToButton = ({
  href,
  onClick,
  text,
  className,
  iconClassName,
  iconStrokeColor,
}: {
  href?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  iconClassName?: string;
  iconStrokeColor?: string;
}) => {
  const sharedClasses =
    'flex items-center gap-3.5 w-fit h-fit text-dark-blue cursor-pointer';

  return (
    <>
      {href && (
        <TransitionLink href={href} className={cn(sharedClasses, className)}>
          <ArrowLeft
            className={cn(iconClassName)}
            strokeColor={iconStrokeColor}
          />{' '}
          {text}
        </TransitionLink>
      )}
      {onClick && (
        <button onClick={onClick} className={cn(sharedClasses, className)}>
          <ArrowLeft
            className={cn(iconClassName)}
            strokeColor={iconStrokeColor}
          />{' '}
          {text}
        </button>
      )}
    </>
  );
};

export default BackToButton;
