import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import { TransitionLink } from '@/src/components/transition-link';
import BackToButton from '@/src/components/ui/buttons/back-to-button';
import { SubRoutesRoute } from '@/src/lib/utils/navigation-routes';
import { motion } from 'motion/react';
import Socials from './socials';
import MenuFooter from './menu-footer';

export const MobileSubNavigation = ({
  route,
  toggleMenu,
  backButtonClick,
  socials,
}: {
  route: SubRoutesRoute;
  toggleMenu: () => void;
  backButtonClick: () => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='h-[calc(100dvh-60px)] w-screen px-side pt-8 flex flex-col bg-dark-blue fixed top-15 left-0 z-105 overflow-y-auto overflow-x-hidden transform'
    >
      <BackToButton
        onClick={backButtonClick}
        text='Back to Main Menu'
        iconClassName='bg-transparent border border-light-blue w-10 h-10'
        iconStrokeColor='hsl(var(--light-blue))'
        className='text-light-blue'
      />
      <div className='pt-4 mt-4 border-t border-lightest-blue'>
        <p className='text-white text-2xl'>{route.label}</p>
        <ul className='px-2.5 mt-4'>
          {route.subRoutes.map((subRoute) => (
            <li key={subRoute.label}>
              <TransitionLink
                href={subRoute.href as string}
                pageName={subRoute.label}
                className='block text-xl leading-7 text-lightest-blue py-2'
                onClick={toggleMenu}
              >
                {subRoute.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
        {socials && socials.length > 0 && (
          <Socials socials={socials} className='mt-4' />
        )}
      </div>
      <MenuFooter />
    </motion.div>
  );
};
