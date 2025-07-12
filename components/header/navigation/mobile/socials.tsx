import SocialBgIcon from '@/components/ui/icons/social-bg-icon';
import { cn } from '@/lib/utils';
import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import Link from 'next/link';

const Socials = ({
  socials,
  className,
}: {
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
  className?: string;
}) => {
  return (
    <div className={cn('flex items-center gap-2.5 pb-4', className)}>
      {socials.map((social) => (
        <Link href={social.link} key={social.name}>
          <SocialBgIcon
            social={social}
            className='w-10 h-10'
            iconClassName='w-4 h-4'
          />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
