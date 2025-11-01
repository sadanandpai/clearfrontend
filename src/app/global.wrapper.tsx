"use client";

import { Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { AppProvider } from "@/ui/providers/app.provider";
import { ThemeProvider } from "@/ui/providers/theme.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Clarity from '@microsoft/clarity';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function GlobalWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      Clarity.init('tytexi8hx4');
    }
  }, []);


  return (
    <>
      <Toaster richColors />
      <Suspense fallback="loading">
        <AppProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </ThemeProvider>
        </AppProvider>
      </Suspense>
    </>
  );
}
