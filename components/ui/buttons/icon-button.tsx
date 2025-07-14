import { TransitionLink } from '@/components/transition-link';
import ArrowUpRight from '../arrow-up-right';
import { Button, buttonVariants } from '../button';

const IconButton = ({
  href,
  text,
  icon,
  onClick,
  className,
}: {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
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
            className,
          })}
        >
          {text}
          {icon || (
            <ArrowUpRight className='size-9!' arrowClassName='size-8!' />
          )}
        </TransitionLink>
      ) : (
        <Button
          onClick={onClick}
          variant='iconButton'
          size='iconButton'
          className={className}
        >
          {text}
          {icon || (
            <ArrowUpRight className='size-9!' arrowClassName='size-8!' />
          )}
        </Button>
      )}
    </>
  );
};

export default IconButton;
