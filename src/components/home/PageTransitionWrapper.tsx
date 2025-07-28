'use client';

import { ReactNode, useContext } from 'react';
import { TransitionContext } from '../transition-link';
import { motion } from 'motion/react';

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isTransitioning } = useContext(TransitionContext);

  return (
    <motion.div
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
