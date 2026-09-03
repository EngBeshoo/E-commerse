'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import Providers from "./provider/ReactQueryProvider";
import NextAuthProvider from "./provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <NextAuthProvider>
          <Toaster />
          {children}
        </NextAuthProvider>
      </Providers>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}