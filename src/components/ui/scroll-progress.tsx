'use client';

import { cn } from '@/src/lib/utils';
import { motion, MotionProps, useScroll } from 'motion/react';
import React from 'react';
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        // bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]
        'fixed inset-x-0 top-0 z-50 h-1 origin-left bg-light-blue',
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';
