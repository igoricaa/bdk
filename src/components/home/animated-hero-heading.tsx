'use client';

import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { motion } from 'motion/react';
import { Image } from 'next-sanity/image';

import { useMemo } from 'react';

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
                  whileInView={{ '--underline-scale': 1 }}
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
      <div className='absolute w-[200px] h-[200px] md:-top-9 md:-right-[220px] lg:-top-14 lg:-right-[100px] 2xl:-top-10 2xl:-right-[50px] rounded-tl-[80px] rounded-br-[80px] overflow-hidden'>
        <Image
          src={urlFor(image).url()}
          alt='BDK Advokati - Hero Image'
          priority
          quality={100}
          width={544}
          height={544}
          className='object-cover w-full h-full'
        />
      </div>
    </div>
  );
}
