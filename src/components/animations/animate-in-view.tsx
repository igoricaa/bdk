'use client';

import {
  motion,
  useInView,
  UseInViewOptions,
  Variants,
  MotionProps,
} from 'motion/react';
import { useRef } from 'react';

type MarginType = UseInViewOptions['margin'];

interface AnimateInViewProps extends MotionProps {
  key?: string;
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inViewMargin?: MarginType;
}

export function AnimateInView({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 0,
  direction = 'down',
  inViewMargin = '0px',
  ...props
}: AnimateInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: inViewMargin });

  const defaultVariants: Variants = {
    hidden: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']:
        direction === 'right' || direction === 'down' ? -offset : offset,
      opacity: 0,
    },
    visible: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
      opacity: 1,
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      exit='hidden'
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: 'easeOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
