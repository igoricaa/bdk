// import { useLocale } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { TransitionLink } from '../transition-link';

export default function LanguageSwitcher({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  // const currentLocale = useLocale();

  return (
    <div className={cn('flex gap-0 items-center', className)}>
      {/* <LanguageSwitcherItem locale={locale === 'sr' ? 'en' : 'sr'}>
        {locale === 'sr' ? 'English' : 'Srpski'}
      </LanguageSwitcherItem> */}
      <p className='text-grey-text text-base md:text-lg mr-4'>
        {locale === 'sr' ? 'Odaberi jezik' : 'Choose Language'}
      </p>
      <LanguageSwitcherItem
        locale='en'
        currentLocale={locale}
        className='rounded-l-xl pl-4 pr-3'
      >
        En
      </LanguageSwitcherItem>
      <LanguageSwitcherItem
        locale='sr'
        currentLocale={locale}
        className='rounded-r-xl pl-3 pr-4'
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
}: {
  locale: string;
  currentLocale: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <TransitionLink
      href={`/blinkdraft/${locale}`}
      className={cn(
        'flex items-center justify-center border border-light-blue uppercase text-light-blue text-sm md:text-base h-6 md:h-7 2xl:h-8 hover:bg-light-blue hover:text-white transition-all duration-300',
        className,
        locale === currentLocale &&
          'bg-light-blue text-white pointer-events-none cursor-auto'
      )}
    >
      {children}
    </TransitionLink>
    // <TransitionLink
    //   href={`/blinkdraft/${locale}`}
    //   className={cn(
    //     'flex items-center justify-center border border-light-blue rounded-[500px] text-light-blue text-sm md:text-base xl:text-lg 2xl:text-xl px-4 h-8 md:h-9 2xl:h-10 hover:bg-light-blue hover:text-white transition-all duration-300',
    //     locale === currentLocale &&
    //       'bg-light-blue text-white pointer-events-none cursor-auto'
    //   )}
    // >
    //   {children}
    // </TransitionLink>
  );
};
