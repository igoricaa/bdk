import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const LinkWithArrow = ({
  href,
  label,
  className,
  iconClassName,
  onMouseEnter,
  iconSize = 20,
}: {
  href: string;
  label: string;
  className?: string;
  iconClassName?: string;
  onMouseEnter?: () => void;
  iconSize?: number;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 transition-[translate,color] text-sm leading-6 2xl:text-lg 2xl:leading-7 hover:text-light-blue duration-300 relative overflow-hidden group/arrow',
        className
      )}
      onMouseEnter={onMouseEnter}
    >
      <ArrowRight
        strokeWidth={1}
        stroke='var(--color-light-blue)'
        size={iconSize}
        className={cn(
          `-translate-x-7 group-hover/arrow:translate-x-0 transition-transform duration-300`,
          iconClassName
        )}
        style={{
          minWidth: iconSize,
          minHeight: iconSize,
        }}
      />
      <span className='transition-transform duration-300 -translate-x-7 group-hover/arrow:translate-x-0'>
        {label}
      </span>
    </Link>
  );
};
