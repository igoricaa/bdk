'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Link as IntlLink } from '../i18n/navigation';
import Link from 'next/link';

interface TransitionContextType {
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  targetPage: string;
  setTargetPage: (value: string) => void;
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

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [targetPage, setTargetPage] = useState<string>('');

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        setIsTransitioning,
        targetPage,
        setTargetPage,
      }}
    >
      {children}
      <TransitionOverlay />
    </TransitionContext.Provider>
  );
}

const pageVariants = {
  initial: {
    y: '100%',
    borderTopLeftRadius: '2rem',
    borderTopRightRadius: '2rem',
    borderBottomLeftRadius: '0rem',
    borderBottomRightRadius: '0rem',
  },
  in: {
    y: 0,
    borderTopLeftRadius: '0rem',
    borderTopRightRadius: '0rem',
    borderBottomLeftRadius: '0rem',
    borderBottomRightRadius: '0rem',
  },
  out: {
    y: '-100%',
    borderTopLeftRadius: '0rem',
    borderTopRightRadius: '0rem',
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '2rem',
  },
};

export function TransitionLink({
  href,
  children,
  pageName,
  className,
  onClick,
  locale,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error('TransitionLink must be used within a TransitionProvider');
  }

  const { setIsTransitioning, setTargetPage } = context;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!pageName && href.includes('blinkdraft')) {
      pageName = 'Blinkdraft';
    } else if (!pageName && href.includes('bdknowledge')) {
      pageName = 'BDKnowledge';
    }

    const name = pageName || getPageName(href);

    setTargetPage(name);
    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 500);
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

function TransitionOverlay() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      'TransitionOverlay must be used within a TransitionProvider'
    );
  }

  const { isTransitioning, targetPage } = context;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-light-blue px-side'
        >
          <h1 className='text-3xl sm:text-5xl md:text-5xl xl:text-7xl text-white text-center'>
            {targetPage}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getPageName(href: string): string {
  if (href === '/') return 'Home';

  const pageName = href.slice(1).split('/')[0];
  return pageName.charAt(0).toUpperCase() + pageName.slice(1);
}
