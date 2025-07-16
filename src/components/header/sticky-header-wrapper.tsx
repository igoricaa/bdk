'use client';

import { cn } from '@/src/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StickyHeaderWrapperProps {
  children: React.ReactNode;
}

const StickyHeaderWrapper = ({ children }: StickyHeaderWrapperProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWhiteHeader, setIsWhiteHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const stickyTopbar = document.getElementById('stickyTopbar');
      const serviceHeroSection = document.getElementById('serviceHeroSection');
      const blogGrid = document.getElementById('blogGrid');

      if (
        pathname === '/' &&
        currentScrollY !== lastScrollY &&
        currentScrollY < 100
      ) {
        setIsWhiteHeader(false);
      }

      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
        setIsWhiteHeader(true);
      }

      const isPastRef = serviceHeroSection
        ? serviceHeroSection.getBoundingClientRect().bottom < 0
        : blogGrid
          ? blogGrid?.getBoundingClientRect()?.top < 0
          : null;

      // Sidebar translation logic
      if (stickyTopbar && isPastRef !== null) {
        if (isHeaderVisible && isPastRef) {
          stickyTopbar.classList.add('translated');
        } else {
          stickyTopbar.classList.remove('translated');
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHeaderVisible]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[transform_background-color] duration-300',
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        pathname === '/'
          ? isWhiteHeader
            ? 'bg-white'
            : 'bg-transparent'
          : 'bg-white'
      )}
    >
      {children}
    </div>
  );
};

export default StickyHeaderWrapper;
