'use client';

import { motion, AnimatePresence, easeOut } from 'motion/react';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '100%',
    borderTopLeftRadius: '2rem',
    borderTopRightRadius: '2rem',
    borderBottomLeftRadius: '0rem',
    borderBottomRightRadius: '0rem',
  },
  in: {
    opacity: 1,
    y: 0,
    borderTopLeftRadius: '0rem',
    borderTopRightRadius: '0rem',
    borderBottomLeftRadius: '0rem',
    borderBottomRightRadius: '0rem',
  },
  out: {
    opacity: 0,
    y: '-100%',
    borderTopLeftRadius: '0rem',
    borderTopRightRadius: '0rem',
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '2rem',
  },
};

const pageTransition = {
  //   type: 'tween',
  ease: easeOut,
  duration: 0.5,
};

// Function to get page name from pathname
const getPageName = (pathname: string) => {
  if (pathname === '/') return 'Home';

  // Remove leading slash and capitalize first letter
  const pageName = pathname.slice(1).split('/')[0];
  return pageName.charAt(0).toUpperCase() + pageName.slice(1);
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageName = getPageName(pathname);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
        transition={pageTransition}
        className='fixed inset-0 z-40 bg-light-blue'
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-white'>{pageName}</h1>
        </div>
      </motion.div>
      <motion.div
        key={`${pathname}-content`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className='relative z-10'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
