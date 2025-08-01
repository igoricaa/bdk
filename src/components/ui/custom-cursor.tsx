'use client';

import { Cursor, useCursorState } from 'motion-plus/react';
import { AnimatePresence } from 'motion/react';

const CustomCursor = () => {
  const { zone } = useCursorState();

  return (
    <AnimatePresence mode='wait'>
      {zone && zone !== 'exempt' && (
        <Cursor
          follow
          center={{ x: 0.5, y: 0.5 }}
          className='flex items-center justify-center min-w-17 min-h-17 max-w-17 max-h-17 p-4 rounded-full! bg-light-blue/90! backdrop-blur-sm'
        >
          <span className='text-white text-sm text-center leading-none'>
            {zone === 'lawyers-card' ? 'View profile' : 'Read more'}
          </span>
        </Cursor>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
