'use client';

import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';

const BackToTop = () => {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    // const scrollY = window.scrollY; // Using window.scrollY for simplicity and broad compatibility
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollY > viewportHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1,
        easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <button
      onClick={handleBackToTop}
      className={cn(
        'fixed bottom-15 lg:bottom-20 right-4 w-10 h-10 lg:w-15 lg:h-15 rounded-full flex items-center justify-center cursor-pointer bg-grey-random/50 backdrop-blur-md transition-all duration-300',
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <ArrowUp
        className='w-8 h-8 lg:w-12 lg:h-12 z-10'
        stroke='white'
        strokeWidth={1}
      />
    </button>
  );
};

export default BackToTop;
