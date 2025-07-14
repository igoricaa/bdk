'use client';

import { PropsWithChildren, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

const Lenis = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.5,
        touchMultiplier: 4,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Lenis;
