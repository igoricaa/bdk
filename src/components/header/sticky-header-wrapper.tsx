'use client';

import { cn } from '@/src/lib/utils';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactNode, // Import ReactNode for children prop
} from 'react';

// A simple throttle utility with basic TypeScript types
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

interface StickyHeaderWrapperProps {
  children: ReactNode;
}

const StickyHeaderWrapper = ({ children }: StickyHeaderWrapperProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isWhiteHeader, setIsWhiteHeader] = useState<boolean>(false);
  const [isSidebarTranslated, setIsSidebarTranslated] =
    useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine header visibility
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsHeaderVisible(false);
      setIsWhiteHeader(true);
    } else {
      setIsHeaderVisible(true);
    }

    // Control desktop scroll burger visibility - only show when scrolling stops
    const desktopScrollBurger: HTMLElement | null = document.getElementById(
      'desktopScrollBurger'
    );
    if (desktopScrollBurger) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide burger while scrolling
      desktopScrollBurger.classList.remove(
        'opacity-100',
        'pointer-events-auto'
      );
      desktopScrollBurger.classList.add('opacity-0', 'pointer-events-none');

      scrollTimeoutRef.current = setTimeout(() => {
        const finalScrollY = window.scrollY;

        const header = headerRef.current;
        const isHeaderHidden = header?.classList.contains('header-hidden');

        if (finalScrollY > 100 && isHeaderHidden) {
          const burger = document.getElementById('desktopScrollBurger');
          if (burger) {
            burger.classList.remove('opacity-0', 'pointer-events-none');
            burger.classList.add('opacity-100', 'pointer-events-auto');
          }
        }
      }, 100);
    }

    // Determine header background for home pages
    if (
      (pathname === '/' || pathname === '/home-clean') &&
      currentScrollY < 100
    ) {
      setIsWhiteHeader(false);
    }

    lastScrollY.current = currentScrollY;
  }, [pathname]);

  useEffect(() => {
    const throttledScrollHandler = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScrollHandler, {
      passive: true,
    });

    // Setup desktop scroll burger click handler
    const handleBurgerClick = () => {
      // Force header to become visible
      setIsHeaderVisible(true);

      // Hide the burger since header is now visible
      const burger = document.getElementById('desktopScrollBurger');
      if (burger) {
        burger.classList.remove('opacity-100', 'pointer-events-auto');
        burger.classList.add('opacity-0', 'pointer-events-none');
      }
    };

    const desktopScrollBurger = document.getElementById('desktopScrollBurger');
    if (desktopScrollBurger) {
      desktopScrollBurger.addEventListener('click', handleBurgerClick);
    }

    // Explicitly type the DOM elements as HTMLElement or null
    const targetElement: HTMLElement | null =
      document.getElementById('serviceHeroSection') ||
      document.getElementById('blogGrid');

    // Early return if the target for the observer isn't found
    if (!targetElement) {
      return () => {
        window.removeEventListener('scroll', throttledScrollHandler);
        if (desktopScrollBurger) {
          desktopScrollBurger.removeEventListener('click', handleBurgerClick);
        }
      };
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // The callback gives us an array of entries, but we're only observing one element.
        const entry = entries[0];
        // `isIntersecting` is false when the element is completely out of view.
        setIsSidebarTranslated(!entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0 } // Fires when the element is 0% visible
    );

    observer.observe(targetElement);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (desktopScrollBurger) {
        desktopScrollBurger.removeEventListener('click', handleBurgerClick);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      observer.disconnect();
    };
  }, [pathname, handleScroll]); // Effect re-runs only if the path or handler function changes

  // Effect to apply class to the external sidebar element
  // This isolates the direct DOM manipulation for clarity and control.
  useEffect(() => {
    const stickyTopbar: HTMLElement | null =
      document.getElementById('stickyTopbar');
    if (stickyTopbar) {
      if (isHeaderVisible && isSidebarTranslated) {
        stickyTopbar.classList.add('translated');
      } else {
        stickyTopbar.classList.remove('translated');
      }
    }
  }, [isHeaderVisible, isSidebarTranslated]);

  return (
    <div
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-70 transition-[transform_background-color] duration-300',
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full header-hidden',
        pathname === '/' || pathname === '/home-clean'
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
