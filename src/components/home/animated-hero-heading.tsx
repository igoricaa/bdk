'use client';

import { cn } from '@/src/lib/utils';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { motion } from 'motion/react';

import { useMemo } from 'react';
import { FloatingImage } from './floating-image';
import { useAppContext } from '../splash-screen/app-ready-provider';

interface AnimatedHeroHeadingProps {
  text: string;
  className?: string;
  image: SanityImageSource;
}

export function AnimatedHeroHeading({
  text,
  className,
  image,
}: AnimatedHeroHeadingProps) {
  const { isAppReady } = useAppContext();
  const words = useMemo(() => text.split(' '), [text]);

  const targetIndices = [3, 4, 6, 7];

  return (
    <div className='relative w-fit'>
      <h1 className={cn(className, 'overflow-visible!')}>
        {words.map((word, index) => {
          const isTargetWord = targetIndices.includes(index);
          const isNotLastWord = index < words.length - 1;

          if (isTargetWord) {
            return (
              <span key={index}>
                <motion.span
                  className='relative animated-underline'
                  initial={{ '--underline-scale': 0 }}
                  whileInView={
                    isAppReady ? { '--underline-scale': 1 } : undefined
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + targetIndices.indexOf(index) * 0.2,
                    ease: 'easeOut',
                  }}
                  style={{
                    willChange: 'transform',
                  }}
                >
                  {word}
                </motion.span>
                {isNotLastWord && ' '}
              </span>
            );
          }

          return (
            <span key={index}>
              {word}
              {isNotLastWord && ' '}
            </span>
          );
        })}
      </h1>
      <FloatingImage
        image={image}
        variant='inverse'
        className='absolute aspect-square w-[120px] lg:w-[180px] 2xl:w-[244px] -top-[136px] md:-top-[23px] md:-right-18 lg:-top-[200px] lg:right-auto lg:left-0 xl:-right-[100px] xl:left-auto xl:-top-[34px] 2xl:-top-20.5 2xl:-right-[6.5rem] rounded-tl-4xl rounded-br-4xl lg:rounded-tl-[3rem] lg:rounded-br-[3rem] overflow-hidden'
      />
    </div>
  );
}
