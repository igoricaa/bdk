'use client';

import {
  AnimationGeneratorType,
  motion,
  RepeatType,
  steps,
} from 'motion/react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // Reduced stagger to make the sequence tighter and more dynamic
      staggerChildren: 2,
    },
  },
};

// Significantly slower drawing animation
const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1.2,
    opacity: 1,
    transition: {
      pathLength: {
        type: 'spring' as AnimationGeneratorType,
        duration: 20,
        bounce: 0,
      },
      opacity: { duration: 0.01 },
    },
  },
};

// Fill delay adjusted for the slower drawing
const fillVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
      duration: 1,
    },
  },
};

// Divider with a faster, infinite blink
const dividerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'mirror' as RepeatType,
        ease: steps(1, 'start'),
      },
    },
  },
};

export default function BestAnimatedLogo() {
  return (
    <motion.div
      className='flex items-center justify-center gap-4 md:gap-8'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      {/* BDK Logo */}
      <motion.svg
        width='180'
        height='100'
        viewBox='0 0 301 168'
        className='w-auto h-20 md:h-28'
        initial='hidden'
        animate='visible'
      >
        <motion.path
          d='M97.132 147.801h-.258V20.191h.258c33.658 0 60.95 28.561 60.95 63.792 0 35.23-27.292 63.818-60.95 63.818m0-146.996H78.268V167.11h14.715c1.366.077 2.758.129 4.15.129 43.888 0 79.478-37.273 79.478-83.23S141.021.805 97.132.805M300.312.832h-25.746l-79.324 83.023V.858h-18.607v166.357h18.607V84.191l79.324 83.024h25.746L220.833 84.01zM34.43 74.318h-.463l-15.334-.026V20.244h15.334c14.251 0 25.771 12.122 25.771 27.037S48.476 74.007 34.431 74.317m-.49 73.485H18.608V93.729h15.798c14.02.284 25.307 12.278 25.307 27.037s-11.52 27.037-25.771 27.037M61.028 84.01c10.489-8.504 17.24-21.79 17.24-36.73 0-25.64-19.843-46.396-44.3-46.448H0v166.357h33.967c24.457-.026 44.3-20.808 44.3-46.449 0-14.94-6.751-28.226-17.24-36.73'
          strokeWidth='3'
          stroke='hsl(206, 76%, 62%)'
          fill='none'
          variants={drawVariants}
        />
        <motion.path
          d='M97.132 147.801h-.258V20.191h.258c33.658 0 60.95 28.561 60.95 63.792 0 35.23-27.292 63.818-60.95 63.818m0-146.996H78.268V167.11h14.715c1.366.077 2.758.129 4.15.129 43.888 0 79.478-37.273 79.478-83.23S141.021.805 97.132.805M300.312.832h-25.746l-79.324 83.023V.858h-18.607v166.357h18.607V84.191l79.324 83.024h25.746L220.833 84.01zM34.43 74.318h-.463l-15.334-.026V20.244h15.334c14.251 0 25.771 12.122 25.771 27.037S48.476 74.007 34.431 74.317m-.49 73.485H18.608V93.729h15.798c14.02.284 25.307 12.278 25.307 27.037s-11.52 27.037-25.771 27.037M61.028 84.01c10.489-8.504 17.24-21.79 17.24-36.73 0-25.64-19.843-46.396-44.3-46.448H0v166.357h33.967c24.457-.026 44.3-20.808 44.3-46.449 0-14.94-6.751-28.226-17.24-36.73'
          fill='hsl(206, 76%, 62%)'
          variants={fillVariants}
        />
      </motion.svg>

      {/* Divider */}
      <motion.svg
        width='3'
        height='112'
        viewBox='0 0 5 282'
        className='w-auto h-24 md:h-32'
        variants={dividerVariants}
      >
        <motion.path d='M4.852 0H.212v282h4.64z' fill='hsl(206, 76%, 62%)' />
      </motion.svg>

      {/* Lawyers Text */}
      <motion.svg
        width='162'
        height='34'
        viewBox='0 0 270 57'
        className='w-auto h-8 md:h-10'
        initial='hidden'
        animate='visible'
      >
        <motion.path
          d='m.071 56.076 20.592-51.8h7.19l20.669 51.8h-6.34l-5.335-14.061H11.514l-5.49 14.06zm13.247-19.024h21.674L24.219 9.24 13.292 37.052zM78.111 56.077l-.464-6.436c-2.474 4.963-6.726 7.29-12.087 7.29-11.468 0-15.72-10.417-15.72-20.343s4.33-19.955 15.875-19.955c4.87 0 9.69 2.715 11.623 7.29V.09h5.644v43.734c0 4.265.154 8.22.386 12.278h-5.257zM66.67 52.123c8.195 0 10.85-8.711 10.85-15.457S74.657 21.44 66.59 21.44c-8.736 0-10.695 8.065-10.695 15.225 0 3.489.541 7.366 2.165 10.416 1.624 2.87 4.252 5.04 8.582 5.04zM101.569 56.054 88.632 17.385h6.108l10.308 33.706 10.386-33.706h5.876l-13.092 38.669zM124.62 36.596c0-11.114 6.572-19.954 18.04-19.954 12.087 0 18.04 8.53 18.04 19.954s-6.108 20.343-18.04 20.343c-3.015 0-5.644-.543-7.886-1.551-6.726-3.257-10.154-10.34-10.154-18.792m18.04 15.612c8.453 0 12.01-8.167 12.01-15.612 0-7.444-3.325-15.224-12.01-15.224s-12.009 7.754-12.009 15.224c0 3.722.85 7.6 2.783 10.65 1.933 2.869 4.948 4.962 9.226 4.962M167.271 56.077V.091h5.643v33.318l16.34-16h7.035l-17.731 17.085 19.819 21.583h-7.423l-18.04-20.187v20.187zM225.406 56.084l-.232-6.204c-2.243 4.963-7.113 7.057-12.01 7.057-6.881 0-12.628-3.645-12.628-11.502 0-9.952 8.685-12.899 19.973-12.899h4.33v-1.86c0-5.894-2.243-9.564-8.66-9.564-3.943 0-7.576 1.085-10.927 3.257l-.464-5.04c3.325-1.63 7.964-2.715 11.623-2.715 9.69 0 14.02 4.73 14.02 14.45v16.775c0 2.869.077 5.505.464 8.22h-5.489zm-3.402-19.412c-7.191 0-15.644.776-15.644 8.53 0 5.195 3.634 7.134 7.423 7.134 8.195 0 11.081-6.203 11.081-13.363v-2.327h-2.86zM257.852 55.763c-1.933.853-4.175 1.163-6.262 1.163-7.886 0-8.917-5.738-8.917-12.82V21.824h-7.268v-4.42h7.268V8.694l5.566-1.939v10.65h8.763v4.42h-8.763v23.754c0 3.412.928 6.436 4.949 6.436 1.546 0 2.86-.388 4.329-1.008l.309 4.73zM264.358 8.792V2.046h5.644v6.746zm0 47.302V17.426h5.644v38.668z'
          fill='white'
          variants={fillVariants}
        />
      </motion.svg>
    </motion.div>
  );
}
