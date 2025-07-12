import { urlFor } from '@/sanity/lib/image';
import Search from './search';
import StickyHeaderWrapper from './sticky-header-wrapper';
import Link from 'next/link';
import { getHeaderData } from '@/lib/utils/navigation-routes';
import DesktopNavigation from './navigation/desktop/desktop-navigation';
import MobileNavigation from './navigation/mobile/mobile-navigation';
import Logo from '../ui/logo';

const Header = async () => {
  const { logo, blinkdraftLogo, socials, navigationRoutes } =
    await getHeaderData();

  if (!logo || !blinkdraftLogo || !navigationRoutes) {
    return null;
  }

  return (
    <StickyHeaderWrapper>
      <header className='px-side h-15 md:h-20 flex justify-between items-center bg-background'>
        <Link href='/'>
          <Logo logo={logo} className='w-24 xl:w-30' />
        </Link>

        <DesktopNavigation
          className='hidden xl:flex'
          navigationRoutes={navigationRoutes}
        />

        <div className='flex items-center gap-8'>
          <div className='hidden sm:block w-27'>
            <img src={urlFor(blinkdraftLogo).url()} alt='BDK Blinkdraft Logo' />
          </div>
          {/* <Search /> */}
          <MobileNavigation
            className='flex xl:hidden'
            navigationRoutes={navigationRoutes}
            socials={socials}
            logo={logo}
          />
        </div>
      </header>
    </StickyHeaderWrapper>
  );
};

export default Header;
