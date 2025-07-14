// components/PageTransition.jsx
'use client';

import { motion, AnimatePresence, easeOut } from 'motion/react';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '-100%',
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
        className='fixed inset-0 z-40'
        style={{
          backgroundColor: 'hsl(207 72% 63%)',
          borderRadius: '2rem',
        }}
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

// // 4. Example page with custom transition
// // app/about/page.jsx
// 'use client';

// import { motion } from 'framer-motion';

// export default function About() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="min-h-screen p-8"
//     >
//       <h1 className="text-4xl font-bold">About Page</h1>
//       <p>This page has smooth transitions!</p>
//     </motion.div>
//   );
// }
