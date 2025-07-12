'use client';

import { AnimatePresence, easeOut, motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const splashVariants = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {showSplash && (
        <motion.div
          key='splash'
          variants={splashVariants}
          initial='initial'
          exit='exit'
          className='fixed inset-0 z-50 flex items-center justify-center'
          style={{ backgroundColor: 'hsl(216 43% 12%)' }}
        >
          <div
            className='absolute inset-0 flex items-center justify-center'
            style={{
              backgroundColor: 'hsl(216 43% 12%)',
              borderBottomLeftRadius: '2rem',
              borderBottomRightRadius: '2rem',
            }}
          >
            <img
              src='/your-logo.png'
              alt='Logo'
              className='max-w-xs max-h-xs object-contain'
            />
          </div>
        </motion.div>
      )}
      {showSplash === false && (
        <motion.div
          key='content'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
