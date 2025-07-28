'use client';

import { AnimatePresence, easeOut, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import BestAnimatedLogo from './bestOne';
import { useAppContext } from './app-ready-provider';

export default function SplashScreen() {
  const { setAppIsReady } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [setAppIsReady]);

  const splashVariants = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <AnimatePresence mode='wait' onExitComplete={() => setAppIsReady(true)}>
      {showSplash && (
        <motion.div
          key='splash'
          variants={splashVariants}
          initial='initial'
          exit='exit'
          className='fixed inset-0 z-1000 flex items-center justify-center'
          style={{ backgroundColor: 'hsl(216 43% 12%)' }}
        >
          <div
            className='absolute inset-0 flex items-center justify-center'
            style={{
              backgroundColor: 'hsl(216 43% 12%)',
              borderBottomLeftRadius: 'var(--radius-main)',
              borderBottomRightRadius: 'var(--radius-main)',
            }}
          >
            <BestAnimatedLogo />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
