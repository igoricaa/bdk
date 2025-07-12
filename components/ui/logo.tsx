import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';

const Logo = ({ logo, className }: { logo: any; className?: string }) => {
  return (
    <div className={cn('w-24 xl:w-30', className)}>
      <Image
        src={urlFor(logo).url()}
        alt='BDK Advokati Logo'
        width={173}
        height={74}
        quality={100}
        priority
        className='w-full h-full object-cover'
      />
    </div>
  );
};

export default Logo;
