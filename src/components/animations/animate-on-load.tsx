'use client';

import { motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';
import { useAppContext } from '../splash-screen/app-ready-provider';

interface AnimateOnLoadProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateOnLoad({
  children,
  className,
  delay = 0,
  ...motionProps
}: AnimateOnLoadProps) {
  const { isAppReady } = useAppContext();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isAppReady ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
