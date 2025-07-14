'use client';

import { motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';

interface InViewWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function InViewWrapper({
  children,
  className,
  delay = 0,
  initial = { opacity: 0, y: 40 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, margin: '-100px 0px 0px 0px' },
  transition = { duration: 0.5, ease: 'easeOut' },
  ...motionProps
}: InViewWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{ ...transition, delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
