'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { TransitionContext } from '../transition-link';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isTransitioning } = useContext(TransitionContext);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      if (isTransitioning) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isTransitioning]);

  return (
    <motion.div
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
