'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [searchParams]);

  return null;
};

export default ScrollHandler;
