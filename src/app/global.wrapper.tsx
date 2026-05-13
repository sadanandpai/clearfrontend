"use client";

import { Suspense, useEffect } from "react";
import { Theme, Spinner } from "@radix-ui/themes";
import { Toaster } from "sonner";
import { AppProvider } from "@/ui/providers/app.provider";
import { ThemeProvider } from "@/ui/providers/theme.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Clarity from "@microsoft/clarity";

function GlobalSuspenseFallback() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--brand-bg-1)"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <Theme accentColor="green" appearance="dark" className="flex items-center justify-center">
        <Spinner size="3" />
      </Theme>
      <span className="sr-only">Loading</span>
    </div>
  );
}

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
    if (process.env.NODE_ENV !== "development") {
      Clarity.init("tytexi8hx4");
    }
  }, []);

  return (
    <>
      <Toaster richColors />
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <AppProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </ThemeProvider>
        </AppProvider>
      </Suspense>
    </>
  );
}
