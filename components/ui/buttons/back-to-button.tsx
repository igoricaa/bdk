import Link from 'next/link';
import ArrowLeft from '../arrow-left';
import { cn } from '@/lib/utils';

const BackToButton = ({
  href,
  text,
  className,
  bgColor,
}: {
  href: string;
  text: string;
  className?: string;
  bgColor?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3.5 w-fit h-fit text-dark-blue',
        className
      )}
    >
      <ArrowLeft className={cn(bgColor)} /> {text}
    </Link>
  );
};

export default BackToButton;
