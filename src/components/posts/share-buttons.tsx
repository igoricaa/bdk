import FbIcon from '../ui/icons/fb-icon';
import LnIcon from '../ui/icons/ln-icon';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';

const ShareButtons = ({
  postSlug,
  postTitle,
  className,
}: {
  postSlug: string;
  postTitle: string;
  className?: string;
}) => {
  if (!postSlug || !postTitle) return null;

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bdklaw.com'}/bdknowledge/${postSlug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(postTitle || '');

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div
      className={cn(
        'flex xl:flex-col gap-4 xl:gap-5 2xl:gap-6 xl:mt-32 items-center xl:items-start',
        className
      )}
    >
      <p className='text-dark-blue 2xl:text-xl'>Share</p>
      <ul className='flex xl:flex-col items-center xl:items-start gap-4 2xl:gap-6'>
        <li>
          <Link
            href={facebookShareUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center min-w-9 min-h-9 w-9 h-9 2xl:min-w-11 2xl:min-h-11 2xl:w-11 2xl:h-11 rounded-[10px] bg-lightest-blue/75 group hover:bg-dark-blue transition-colors duration-300'
          >
            <FbIcon
              className='w-4 h-4 2xl:w-6 2xl:h-6 transition-colors duration-300'
              pathClassName='group-hover:fill-white'
            />
          </Link>
        </li>
        <li>
          <Link
            href={linkedinShareUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center min-w-9 min-h-9 w-9 h-9 2xl:min-w-11 2xl:min-h-11 2xl:w-11 2xl:h-11 rounded-[10px] bg-lightest-blue/75 group hover:bg-dark-blue transition-colors duration-300'
          >
            <LnIcon
              className='w-4 h-4 2xl:w-6 2xl:h-6 transition-colors duration-300'
              pathClassName='group-hover:fill-white'
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ShareButtons;
