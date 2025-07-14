'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data fresh indefinitely until manually invalidated
            staleTime: Infinity,
            // Keep data in cache for 10 minutes after component unmount
            gcTime: 10 * 60 * 1000,
            // Retry failed requests only once
            retry: 1,
            // Don't refetch on window focus since we're using infinite staleTime
            refetchOnWindowFocus: false,
            // Don't refetch on mount since we're using infinite staleTime
            refetchOnMount: false,
            // Don't refetch on reconnect since we're using infinite staleTime
            refetchOnReconnect: false,
          },
        },
      })
  );

  // Expose QueryClient instance for cache invalidation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__QUERY_CLIENT__ = queryClient;
    }
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
