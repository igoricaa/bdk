import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const Logo = ({
  logo,
  className,
}: {
  logo: SanityImageSource;
  className?: string;
}) => {
  return (
    <div className={cn('w-24 xl:w-30', className)}>
      <img
        src={urlFor(logo).url()}
        alt='BDK Advokati Logo'
        className='w-full h-full object-cover'
      />
    </div>
  );
};

export default Logo;
