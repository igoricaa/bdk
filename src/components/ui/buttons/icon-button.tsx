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
  locale,
  pageName,
  iconClassName,
  disabled,
  props,
}: {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  locale?: string;
  pageName?: string;
  iconClassName?: string;
  disabled?: boolean;
  props?: React.ComponentProps<typeof Button>;
}) => {
  return (
    <>
      {href ? (
        <TransitionLink
          href={href}
          locale={locale}
          pageName={pageName}
          onClick={onClick}
          disabled={disabled}
          className={buttonVariants({
            variant: 'iconButton',
            size: 'iconButton',
            className: cn('group', className),
          })}
        >
          <AnimatedText text={text} />
          {icon || (
            <ArrowUpRight
              className={cn('size-9! duration-700', iconClassName)}
              arrowClassName='size-8!'
            />
          )}
        </TransitionLink>
      ) : (
        <Button
          type={type}
          onClick={onClick}
          variant='iconButton'
          size='iconButton'
          className={cn('group', className)}
          disabled={disabled}
          {...props}
        >
          <AnimatedText text={text} />
          {icon || (
            <ArrowUpRight
              className={cn('size-9! duration-700', iconClassName)}
              arrowClassName='size-8!'
            />
          )}
        </Button>
      )}
    </>
  );
};

export default IconButton;
