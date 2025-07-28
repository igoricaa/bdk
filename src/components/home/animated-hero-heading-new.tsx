'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useAppContext } from '../splash-screen/app-ready-provider';

interface AnimatedHeroHeadingProps {
  text: string;
  className?: string;
}

export function AnimatedHeroHeading({
  text,
  className,
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
    </div>
  );
}
