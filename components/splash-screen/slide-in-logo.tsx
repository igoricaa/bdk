'use client';

import { easeOut, motion, RepeatType, steps } from 'motion/react';
import Bdk from './bdk';
import Divider from './divider';
import LawyersText from './lawyers-text';

const MotionBdk = motion(Bdk);
const MotionDivider = motion(Divider);
const MotionLawyersText = motion(LawyersText);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      scaleY: {
        duration: 0.5,
        ease: easeOut,
      },
      opacity: {
        duration: 0.4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'mirror' as RepeatType,
        ease: steps(1, 'start'),
        delay: 0.5, // Start blinking after the initial scale-up
      },
    },
  },
};

const bdkVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      delay: 2,
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const lawyersTextVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      delay: 3,
      duration: 0.7,
      ease: easeOut,
    },
  },
};

export default function SlideAnimatedLogo() {
  return (
    <motion.div
      className='flex items-center justify-center gap-4 md:gap-8'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='overflow-hidden'>
        <MotionBdk
          className='w-auto h-20 md:h-28 text-light-blue'
          variants={bdkVariants}
        />
      </div>
      <MotionDivider
        className='w-auto h-24 md:h-32 text-light-blue'
        variants={dividerVariants}
      />
      <div className='overflow-hidden'>
        <MotionLawyersText
          className='w-auto h-8 md:h-10 text-white'
          variants={lawyersTextVariants}
        />
      </div>
    </motion.div>
  );
}
