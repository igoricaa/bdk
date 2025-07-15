'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // This ref will hold the DOM element we are currently hovering over
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Update cursor position
      setPosition({ x: e.clientX, y: e.clientY });

      // Find the closest ancestor with the 'lawyer-card' class
      const target = e.target as HTMLElement;
      const lawyerCard = target.closest('.lawyer-card') as HTMLElement | null;

      if (lawyerCard) {
        // --- MOUSE IS OVER A LAWYER CARD ---
        setIsHovering(true);
        // Hide system cursor on the lawyer card
        lawyerCard.style.cursor = 'none !important';

        // If we weren't hovering this element before, update its style
        if (hoveredElementRef.current !== lawyerCard) {
          // Reset style on the previously hovered element (if any)
          if (hoveredElementRef.current) {
            hoveredElementRef.current.style.cursor = '';
          }
          // Apply new style and update the ref
          lawyerCard.style.cursor = 'none';
          hoveredElementRef.current = lawyerCard;
        }
      } else {
        // --- MOUSE IS NOT OVER A LAWYER CARD ---
        setIsHovering(false);

        // If we were hovering an element, reset its style and clear the ref
        if (hoveredElementRef.current) {
          hoveredElementRef.current.style.cursor = '';
          hoveredElementRef.current = null;
        }
      }
    };

    // We only need one listener for mouse movement
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      // Clean up style on the last hovered element when component unmounts
      if (hoveredElementRef.current) {
        hoveredElementRef.current.style.cursor = '';
      }
    };
  }, []); // Empty dependency array ensures this runs only once

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
            View Profile
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
