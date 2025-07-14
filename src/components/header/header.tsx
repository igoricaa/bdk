import { urlFor } from '@/src/sanity/lib/image';
import StickyHeaderWrapper from './sticky-header-wrapper';
import { TransitionLink } from '@/src/components/transition-link';
import { getHeaderData } from '@/src/lib/utils/navigation-routes';
import DesktopNavigation from './navigation/desktop/desktop-navigation';
import MobileNavigation from './navigation/mobile/mobile-navigation';
import Logo from '../ui/logo';
import { MainSearch } from '../search-main';
import { Image } from 'next-sanity/image';

const Header = async () => {
  const { logo, blinkdraftLogo, socials, navigationRoutes } =
    await getHeaderData();

  if (
    !logo.logoBlack ||
    !logo.logoWhite ||
    !blinkdraftLogo ||
    !navigationRoutes
  ) {
    return null;
  }

  return (
    <StickyHeaderWrapper>
      <header
        id='top'
        className='px-side h-15 md:h-20 flex justify-between items-center bg-white'
      >
        <TransitionLink href='/'>
          <Logo logo={logo.logoBlack} className='w-24 xl:w-30' />
        </TransitionLink>

        <DesktopNavigation
          className='hidden xl:flex'
          navigationRoutes={navigationRoutes}
        />

        <div className='flex items-center gap-8'>
          <TransitionLink
            href='/blinkdraft/en'
            className='hidden sm:block w-27'
          >
            <Image
              src={urlFor(blinkdraftLogo).url()}
              alt='BDK Blinkdraft Logo'
              width={454}
              height={144}
              className='w-full h-full object-cover'
              unoptimized={true}
            />
          </TransitionLink>
          <MainSearch className='hidden md:block md:max-w-40' />
          <MobileNavigation
            className='flex xl:hidden'
            navigationRoutes={navigationRoutes}
            socials={socials}
            logo={logo.logoWhite}
            blinkdraftLogo={blinkdraftLogo}
          />
        </div>
      </header>
    </StickyHeaderWrapper>
  );
};

export default Header;
