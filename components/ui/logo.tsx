import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';

const Logo = ({ logo, className }: { logo: any; className?: string }) => {
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
