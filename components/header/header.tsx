import { urlFor } from '@/sanity/lib/image';
import Burger from './burger';
import Search from './search';

const Header = ({
  bdkLogo,
  blinkdraftLogo,
}: {
  bdkLogo: any;
  blinkdraftLogo: any;
}) => {
  return (
    <header className='px-side h-15 md:h-20 flex justify-between items-center'>
      <div className='w-24 xl:w-30'>
        <img src={urlFor(bdkLogo).url()} alt='BDK Advokati Logo' />
      </div>

      <div className='flex items-center gap-8'>
        {/* <div className='hidden xl:flex'>Navigation</div> */}

        <div className='hidden sm:block w-27'>
          <img src={urlFor(blinkdraftLogo).url()} alt='BDK Blinkdraft Logo' />
        </div>
        {/* <Search /> */}
        <Burger />
      </div>
    </header>
  );
};

export default Header;
