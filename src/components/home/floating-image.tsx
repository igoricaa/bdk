'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Image } from 'next-sanity/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/src/sanity/lib/image';

type Variant =
  | 'default'
  | 'inverse'
  | 'rotational'
  | 'diagonal'
  | 'scaling'
  | 'orbital';

export const FloatingImage = ({
  image,
  className,
  variant = 'default',
}: {
  image: SanityImageSource;
  className?: string;
  variant?: Variant;
}) => {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetRotate = useMotionValue(0);
  const targetScale = useMotionValue(1);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };

  const springX = useSpring(targetX, springConfig);
  const springY = useSpring(targetY, springConfig);
  const springRotate = useSpring(targetRotate, springConfig);
  const springScale = useSpring(targetScale, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      const moveAmount = 25;
      const rotateAmount = 15;
      const scaleAmount = 0.2;
      const orbitalRadius = 35;

      switch (variant) {
        case 'inverse':
          targetX.set(-x * moveAmount);
          targetY.set(-y * moveAmount);
          targetRotate.set(0);
          targetScale.set(1);
          break;
        case 'rotational':
          targetX.set(x * moveAmount);
          targetY.set(y * moveAmount);
          targetRotate.set(x * rotateAmount);
          targetScale.set(1);
          break;
        case 'diagonal':
          targetX.set(y * moveAmount * 1.5);
          targetY.set(x * moveAmount * 1.5);
          targetRotate.set(0);
          targetScale.set(1);
          break;
        case 'scaling':
          targetX.set(x * moveAmount);
          targetY.set(y * moveAmount);
          targetScale.set(1 + y * scaleAmount);
          targetRotate.set(0);
          break;
        case 'orbital':
          const angle = x * 2 * Math.PI;
          const radius = orbitalRadius + y * (orbitalRadius / 2);
          targetX.set(Math.cos(angle) * radius);
          targetY.set(Math.sin(angle) * radius);
          targetRotate.set(0);
          targetScale.set(1);
          break;
        case 'default':
        default:
          targetX.set(x * moveAmount);
          targetY.set(y * moveAmount);
          targetRotate.set(0);
          targetScale.set(1);
          break;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant, targetX, targetY, targetRotate, targetScale]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotate: springRotate,
        scale: springScale,
      }}
      className={className}
    >
      <Image
        src={urlFor(image).url()}
        alt='BDK Advokati - Hero Image'
        priority
        quality={100}
        width={544}
        height={544}
        className='h-full w-full object-cover'
      />
    </motion.div>
  );
};
