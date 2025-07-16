'use client';
import { cn } from '@/src/lib/utils';
import React, { ReactNode } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div>
      <div
        className={cn(
          'px-side relative flex h-screen flex-col justify-center bg-white',
          className
        )}
        {...props}
      >
        <div
          className='absolute inset-0 overflow-hidden'
          style={
            {
              '--aurora-gradient':
                'repeating-linear-gradient(90deg, hsl(var(--light-blue)) 20%, hsl(var(--lightest-blue)) 30%, hsl(var(--light-blue-bg)) 45%, hsl(var(--light-blue)) 70%)',
              '--white-overlay':
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 7%, transparent 10%, transparent 12%, rgba(255,255,255,0.5) 16%)',
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `pointer-events-none absolute -inset-[10px] opacity-75 blur-[7px] will-change-transform`,
              `[background-image:var(--white-overlay),var(--aurora-gradient)]`,
              `[background-size:300%,_200%]`,
              `[background-position:50%_50%,50%_50%]`,
              `animate-aurora`,
              `after:absolute after:inset-0 after:content-[""]`,
              `after:[background-image:var(--white-overlay),var(--aurora-gradient)]`,
              `after:[background-size:200%,_100%]`,
              `after:animate-aurora`,
              `after:mix-blend-soft-light`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,white_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </div>
  );
};
