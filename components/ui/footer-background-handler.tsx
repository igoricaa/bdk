'use client';

import { useEffect } from 'react';

interface FooterBackgroundHandlerProps {
  changeColor: boolean;
}

export function FooterBackgroundHandler({
  changeColor,
}: FooterBackgroundHandlerProps) {
  useEffect(() => {
    const footer = document.getElementById('footer');

    if (footer) {
      if (changeColor) {
        footer.style.backgroundColor = 'hsl(var(--dark-blue))';
      } else {
        footer.style.backgroundColor = '';
      }
    }
  }, [changeColor]);

  return null;
}
