import { cn } from '@/src/lib/utils';
import { TransitionLink } from '../transition-link';

export default function LanguageSwitcher({
  locale,
  className,
  href,
  pageName,
}: {
  locale: string;
  className?: string;
  href?: string;
  pageName?: string;
}) {
  return (
    <div className={cn('flex gap-0 items-center', className)}>
      <p className='text-grey-text text-base md:text-lg mr-4'>
        {locale === 'sr' ? 'Odaberi jezik' : 'Choose Language'}
      </p>
      <LanguageSwitcherItem
        locale='en'
        currentLocale={locale}
        className='rounded-l-xl pl-4 pr-3'
        href={href}
        pageName={pageName}
      >
        En
      </LanguageSwitcherItem>
      <LanguageSwitcherItem
        locale='sr'
        currentLocale={locale}
        className='rounded-r-xl pl-3 pr-4'
        href={href}
        pageName={pageName}
      >
        SR
      </LanguageSwitcherItem>
    </div>
  );
}

const LanguageSwitcherItem = ({
  locale,
  currentLocale,
  children,
  className,
  href,
  pageName,
}: {
  locale: string;
  currentLocale: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
  pageName?: string;
}) => {
  return (
    <TransitionLink
      href={`/blinkdraft/${locale}${href ? href : ''}`}
      pageName={pageName ? pageName : ''}
      className={cn(
        'flex items-center justify-center border border-light-blue uppercase text-light-blue text-sm md:text-base h-6 md:h-7 2xl:h-8 hover:bg-light-blue hover:text-white transition-all duration-300',
        className,
        locale === currentLocale &&
          'bg-light-blue text-white pointer-events-none cursor-auto'
      )}
    >
      {children}
    </TransitionLink>
  );
};
