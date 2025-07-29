'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { LenisRef, ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useTempus } from 'tempus/react';

const Lenis = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  useTempus((time: number) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time);
    }
  });

  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.3,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 3,
        infinite: false,
        anchors: true,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Lenis;
