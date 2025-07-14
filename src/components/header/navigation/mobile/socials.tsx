import SocialBgIcon from '@/src/components/ui/icons/social-bg-icon';
import { cn } from '@/src/lib/utils';
import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import { TransitionLink } from '@/src/components/transition-link';

const Socials = ({
  socials,
  className,
}: {
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
  className?: string;
}) => {
  return (
    <div className={cn('flex items-center gap-2.5 pb-20', className)}>
      {socials.map((social) => (
        <TransitionLink href={social.link} key={social.name}>
          <SocialBgIcon
            socialName={social.name}
            socialIcon={social.icons.iconLight}
            className='w-10 h-10'
            iconClassName='w-4 h-4'
          />
        </TransitionLink>
      ))}
    </div>
  );
};

export default Socials;
