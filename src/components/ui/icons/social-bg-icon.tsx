import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const SocialBgIcon = ({
  socialName,
  socialIcon,
  className,
  iconClassName,
}: {
  socialName: string;
  socialIcon: SanityImageSource;
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
      src={urlFor(socialIcon).url()}
      alt={socialName}
      className={cn('object-contain', iconClassName)}
    />
  </div>
);

export default SocialBgIcon;
