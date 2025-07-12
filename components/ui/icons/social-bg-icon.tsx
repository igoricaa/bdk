import { cn } from '@/lib/utils';
import { Social } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

const SocialBgIcon = ({
  social,
  className,
  iconClassName,
}: {
  social: Social;
  className?: string;
  iconClassName?: string;
}) => (
  <div
    className={cn(
      'flex items-center justify-center min-w-7.5 min-h-7.5 w-7.5 h-7.5 rounded-full bg-light-blue p-2',
      className
    )}
  >
    <img
      src={urlFor(social.icon).url()}
      alt={social.name}
      className={cn('object-contain', iconClassName)}
    />
  </div>
);

export default SocialBgIcon;
