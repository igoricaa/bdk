import { cn } from '@/src/lib/utils';
import { ArrowRight } from 'lucide-react';
import { TransitionLink } from '../transition-link';

export const LinkWithArrow = ({
  href,
  onClick,
  label,
  className,
  iconClassName,
  onMouseEnter,
  iconSize = 20,
  isActive,
}: {
  href: string;
  onClick?: () => void;
  label: string;
  className?: string;
  iconClassName?: string;
  onMouseEnter?: () => void;
  iconSize?: number;
  isActive?: boolean;
}) => {
  const buttonClassName = cn(
    'flex items-center w-fit gap-x-2 transition-[translate,color] text-sm leading-6 2xl:text-lg 2xl:leading-7 hover:text-light-blue duration-300 relative overflow-hidden group/arrow cursor-pointer text-start',
    className,
    isActive && 'text-light-blue'
  );

  return (
    <>
      {onClick ? (
        <button onClick={onClick} className={buttonClassName}>
          <ButtonContent
            label={label}
            iconSize={iconSize}
            iconClassName={iconClassName}
            isActive={isActive}
          />
        </button>
      ) : (
        <TransitionLink
          href={href}
          pageName={label}
          className={cn(buttonClassName)}
          onMouseEnter={onMouseEnter}
        >
          <ButtonContent
            label={label}
            iconSize={iconSize}
            iconClassName={iconClassName}
            isActive={isActive}
          />
        </TransitionLink>
      )}
    </>
  );
};

const ButtonContent = ({
  label,
  iconSize,
  iconClassName,
  isActive,
}: {
  label: string;
  iconSize?: number;
  iconClassName?: string;
  isActive?: boolean;
}) => {
  return (
    <>
      <ArrowRight
        strokeWidth={1}
        stroke='var(--color-light-blue)'
        size={iconSize}
        className={cn(
          `hidden lg:block -translate-x-7 lg:group-hover/arrow:translate-x-0 transition-transform duration-300`,
          iconClassName,
          isActive && 'translate-x-0'
        )}
        style={{
          minWidth: iconSize,
          minHeight: iconSize,
        }}
      />
      <span
        className={cn(
          'transition-transform duration-300 lg:-translate-x-7 lg:group-hover/arrow:translate-x-0',
          isActive && 'translate-x-0'
        )}
      >
        {label}
      </span>
    </>
  );
};
