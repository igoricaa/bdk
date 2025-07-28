'use client';

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Link as IntlLink } from '../i18n/navigation';
import Link from 'next/link';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

interface TransitionProviderProps {
  children: ReactNode;
}

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  pageName?: string;
  className?: string;
  [key: string]: any;
}

export const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: (href: string) => {},
});

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (isTransitioning) {
      setIsTransitioning(false);
    }
  }, [pathname]);

  const startTransition = (href: string) => {
    if (pathname === href) return;

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  children,
  pageName,
  className,
  onClick,
  locale,
  ...props
}: TransitionLinkProps) {
  const { startTransition } = useContext(TransitionContext);

  if (!startTransition) {
    throw new Error('TransitionLink must be used within a TransitionProvider');
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href);
  };

  return locale ? (
    <IntlLink
      href={href}
      onClick={(e) => {
        handleClick(e);
        if (onClick) {
          onClick(e);
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </IntlLink>
  ) : (
    <Link
      href={href}
      onClick={(e) => {
        handleClick(e);
        if (onClick) {
          onClick(e);
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
