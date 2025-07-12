import {
  easeInOut,
  easeOut,
  motion,
  RepeatType,
  useAnimationControls,
} from 'motion/react';
import { useEffect } from 'react';
import Bdk from './bdk';
import Divider from './divider';
import LawyersText from './lawyers-text';

const AnimatedLogo2 = () => {
  const controls = useAnimationControls(); // Initialize animation controls for the divider

  // Variants for the Divider blip animation
  const dividerVariants = {
    hidden: { opacity: 0 },
    blip: {
      opacity: [0, 1, 0, 1, 0, 1, 0],
      transition: {
        duration: 2,
        repeat: 2,
        repeatType: 'loop' as RepeatType,
      },
    },
    final: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Variants for the BDK text animation (slides in from the left)
  const bdkVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 6.5, // Adjusted delay: after blip (6s) + final duration (0.5s)
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  // Variants for the LawyersText animation (slides in from the right)
  const lawyersTextVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 6.5, // Adjusted delay: after blip (6s) + final duration (0.5s)
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  useEffect(() => {
    controls.start('hidden').then(() => {
      controls.start('blip');
    });
    const timer = setTimeout(() => {
      controls.start('final');
    }, 6000); // Trigger final after 6 seconds (blip duration: 2s * 3 plays = 6s)
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 font-inter p-4 overflow-hidden'>
      <div className='flex items-center justify-center space-x-4'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={bdkVariants}
          className='flex-shrink-0'
        >
          <Bdk />
        </motion.div>

        <motion.div
          animate={controls} // Removed initial='hidden'
          variants={dividerVariants}
          className='flex-shrink-0'
        >
          <Divider />
        </motion.div>

        {/* Lawyers Text Part: Wrapped in motion.div for animation */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={lawyersTextVariants}
          className='flex-shrink-0'
        >
          <LawyersText />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedLogo2;
