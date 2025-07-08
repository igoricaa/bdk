import { urlFor } from '@/sanity/lib/image';
import Burger from './burger';
import Search from './search';
import StickyHeaderWrapper from './sticky-header-wrapper';
import Link from 'next/link';
import DesktopNavigation from '../ui/navigation/desktop/desktop-navigation';
import { getNavigationRoutes } from '@/lib/utils/navigation-routes';

const Header = async ({
  bdkLogo,
  blinkdraftLogo,
}: {
  bdkLogo: any;
  blinkdraftLogo: any;
}) => {
  const navigationRoutes = await getNavigationRoutes();

  return (
    <StickyHeaderWrapper>
      <header className='px-side h-15 md:h-20 flex justify-between items-center bg-background'>
        <div className='w-24 xl:w-30'>
          <Link href='/'>
            <img src={urlFor(bdkLogo).url()} alt='BDK Advokati Logo' />
          </Link>
        </div>

        <DesktopNavigation
          className='hidden xl:flex'
          navigationRoutes={navigationRoutes}
        />

        <div className='flex items-center gap-8'>
          <div className='hidden sm:block w-27'>
            <img src={urlFor(blinkdraftLogo).url()} alt='BDK Blinkdraft Logo' />
          </div>
          {/* <Search /> */}
          <Burger />
        </div>
      </header>
    </StickyHeaderWrapper>
  );
};

export default Header;
