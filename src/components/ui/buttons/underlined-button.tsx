import { cn } from '@/src/lib/utils';
import { TransitionLink } from '../../transition-link';
import { Button, buttonVariants } from '../button';

const UnderlinedButton = ({
  href,
  children,
  className,
  onClick,
  pageName,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  pageName?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      {href ? (
        <TransitionLink
          href={href}
          pageName={pageName}
          onClick={onClick}
          className={cn(buttonVariants({ variant: 'underlined' }), className)}
        >
          {children}
        </TransitionLink>
      ) : (
        <Button
          variant='underlined'
          onClick={onClick}
          className={className}
          disabled={disabled}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default UnderlinedButton;
