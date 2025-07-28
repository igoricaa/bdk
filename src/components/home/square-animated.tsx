'use client';

import Image from 'next/image';
import img1 from '@/public/hero-1.png';
import img2 from '@/public/hero-2.png';
import { inView, motion, useInView } from 'motion/react';
import { useRef } from 'react';

const SquareAnimated = () => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, {
    once: true,
    margin: '-100px 0px 0px 0px',
  });
  const isInView = !inView || inViewResult;

  return (
    <div className='col-span-1 xl:col-span-5 relative aspect-square grid grid-cols-2'>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -75, x: -75 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: -75, x: -75 }
        }
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className='bg-dark-blue w-[85%] aspect-[215/206] rounded-tl-[3rem] self-end justify-self-end'
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: -75, x: 75 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, x: -1 }
            : { opacity: 0, y: -75, x: 75 }
        }
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className='rounded-tr-[3rem] overflow-hidden'
      >
        <Image
          src={img1}
          alt='Hero Background'
          width={500}
          height={500}
          priority
          className='object-cover w-full aspect-square'
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 75, x: -75 }}
        animate={
          isInView
            ? { opacity: 1, y: -1, x: 0 }
            : { opacity: 0, y: 75, x: -75 }
        }
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className='rounded-bl-[3rem] overflow-hidden'
      >
        <Image
          src={img2}
          alt='Hero Background'
          width={500}
          height={500}
          priority
          className='object-cover w-full aspect-square'
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 75, x: 75 }}
        animate={
          isInView ? { opacity: 1, y: -1, x: 0 } : { opacity: 0, y: 75, x: 75 }
        }
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className=' bg-dark-blue w-[85%] aspect-[215/206] rounded-br-[3rem]'
      ></motion.div>
    </div>
  );
};

export default SquareAnimated;
