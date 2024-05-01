'use client';

import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useRef(new QueryClient());

    return <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
}
