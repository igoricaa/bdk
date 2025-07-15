'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('View');
  const [isHovering, setIsHovering] = useState(false);
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;

    if (!isDesktop) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isExempt = target.closest('[data-cursor-exempt]');

      const hoverTarget = target.closest(
        '[data-cursor-hover]'
      ) as HTMLElement | null;

      if (isExempt) {
        setIsHovering(false);
        if (hoveredElementRef.current) {
          hoveredElementRef.current.style.cursor = 'pointer';
          hoveredElementRef.current = null;
        }
        return;
      }

      if (hoverTarget) {
        setIsHovering(true);

        // If we weren't already hovering sthis specific element, update its style.
        if (hoveredElementRef.current !== hoverTarget) {
          // Reset the cursor style on the previously hovered element (if any).
          if (hoveredElementRef.current) {
            hoveredElementRef.current.style.cursor = '';
          }

          const text = hoverTarget.dataset.cursorText || 'View';
          setCursorText(text);
          hoverTarget.style.cursor = 'none';
          hoveredElementRef.current = hoverTarget;
        }
      } else {
        setIsHovering(false);
        if (hoveredElementRef.current) {
          hoveredElementRef.current.style.cursor = '';
          hoveredElementRef.current = null;
        }
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (hoveredElementRef.current) {
        hoveredElementRef.current.style.cursor = '';
      }
    };
  }, []);

  const cursorVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
      x: position.x - 50,
      y: position.y - 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: position.x - 50,
      y: position.y - 50,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: position.x - 50,
      y: position.y - 50,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isHovering && (
        <motion.div
          variants={cursorVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          style={{ x: position.x - 50, y: position.y - 50 }}
          className='pointer-events-none fixed left-0 top-0 z-50 flex h-25 w-25 items-center justify-center rounded-full bg-light-blue/90 backdrop-blur-sm p-4'
        >
          <span className='text-white text-lg text-center leading-none'>
            {cursorText}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
