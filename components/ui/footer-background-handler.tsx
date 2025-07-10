'use client';

import { useEffect } from 'react';

interface FooterBackgroundHandlerProps {
  changeColor: boolean;
  color: string;
}

export function FooterBackgroundHandler({
  changeColor,
  color,
}: FooterBackgroundHandlerProps) {
  useEffect(() => {
    const footer = document.getElementById('footer');

    if (footer) {
      if (changeColor) {
        footer.style.backgroundColor = color;
      } else {
        footer.style.backgroundColor = '';
      }
    }
  }, [changeColor]);

  return null;
}
