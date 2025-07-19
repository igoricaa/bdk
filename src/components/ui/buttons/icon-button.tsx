import { TransitionLink } from '@/src/components/transition-link';
import ArrowUpRight from '../arrow-up-right';
import { Button, buttonVariants } from '../button';
import { cn } from '@/src/lib/utils';
import { AnimatedText } from '../animated-text';

const IconButton = ({
  href,
  text,
  icon,
  onClick,
  className,
  type,
}: {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <>
      {href ? (
        <TransitionLink
          href={href}
          onClick={onClick}
          className={buttonVariants({
            variant: 'iconButton',
            size: 'iconButton',
            className: cn('group', className),
          })}
        >
          <AnimatedText text={text} />
          {icon || (
            <ArrowUpRight className='size-9! duration-700' arrowClassName='size-8!' />
          )}
        </TransitionLink>
      ) : (
        <Button
          type={type}
          onClick={onClick}
          variant='iconButton'
          size='iconButton'
          className={cn('group', className)}
        >
          <AnimatedText text={text} />
          {icon || (
            <ArrowUpRight className='size-9! duration-700' arrowClassName='size-8!' />
          )}
        </Button>
      )}
    </>
  );
};

export default IconButton;
