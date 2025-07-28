'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isAppReady: boolean;
  setAppIsReady: (isReady: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAppReady, setAppIsReady] = useState(false);

  const value = { isAppReady, setAppIsReady };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Create a custom hook for easy access to the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
