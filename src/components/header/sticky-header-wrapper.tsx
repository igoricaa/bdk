'use client';

import { useEffect, useState } from 'react';

interface StickyHeaderWrapperProps {
  children: React.ReactNode;
}

const StickyHeaderWrapper = ({ children }: StickyHeaderWrapperProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const stickyTopbar = document.getElementById('stickyTopbar');
      const serviceHeroSection = document.getElementById('serviceHeroSection');
      const blogGrid = document.getElementById('blogGrid');

      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {children}
    </div>
  );
};

export default StickyHeaderWrapper;
