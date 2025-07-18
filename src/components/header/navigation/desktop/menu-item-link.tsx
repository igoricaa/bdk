import { LinkWithArrow } from '@/src/components/ui/link-arrow';
import { cn } from '@/src/lib/utils';

const MenuItemLink = ({
  className,
  href,
  label,
  iconSize = 20,
  onMouseEnter,
  isActive,
}: {
  className?: string;
  href?: string;
  label: string;
  iconSize?: number;
  onMouseEnter?: () => void;
  isActive?: boolean;
}) => {
  return (
    <>
      {href ? (
        <LinkWithArrow
          href={href}
          label={label}
          className={cn(
            'text-base leading-6.5 2xl:text-base text-grey-darker hover:bg-transparent hover:text-light-blue focus:bg-transparent focus:text-light-blue py-2',
            className
          )}
          iconSize={iconSize}
          onMouseEnter={onMouseEnter}
          isActive={isActive}
        />
      ) : (
        <span
          className={cn(
            'text-base leading-6.5 2xl:text-base text-grey-darker hover:bg-transparent hover:text-light-blue focus:bg-transparent focus:text-light-blue py-2',
            isActive && 'bg-transparent text-light-blue'
          )}
        >
          {label}
        </span>
      )}
    </>
  );
};

export default MenuItemLink;
