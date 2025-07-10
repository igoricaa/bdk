import { cn } from '@/lib/utils';
import { LinkWithArrow } from '../../link-arrow';

const MenuItemLink = ({
  className,
  href,
  label,
  iconSize = 20,
  onMouseEnter,
}: {
  className?: string;
  href: string;
  label: string;
  iconSize?: number;
  onMouseEnter?: () => void;
}) => {
  return (
    <LinkWithArrow
      href={href}
      label={label}
      className={cn(
        'text-base leading-6.5 2xl:text-base text-grey-darker hover:bg-transparent hover:text-light-blue focus:bg-transparent focus:text-light-blue py-2',
        className
      )}
      iconSize={iconSize}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default MenuItemLink;
