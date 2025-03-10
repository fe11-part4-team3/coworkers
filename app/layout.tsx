'use client';

import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

// import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/utilities.css';

import { ThemeProvider } from '@/utils/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import Headers from '@/components/layout/Header/Headers';
import { DeviceTypeProvider } from '@/contexts/DeviceTypeContext';
import Modal from '@/components/modal/Modal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SnackbarProvider } from '@/contexts/SnackBar.context';
import DynamicTitle from '@/components/DynamicTitle';

const queryClient = new QueryClient();

const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then(
      (mod) => mod.ReactQueryDevtools,
    ),
  { ssr: false },
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="Coworkers | 함께 만들어가는 Todo List"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="scrollbar">
        <DeviceTypeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryClient}>
              <SessionProvider refetchInterval={0}>
                <TooltipProvider>
                  <SidebarProvider defaultOpen={false}>
                    <SnackbarProvider>
                      <Headers />
                      <Modal />
                      <Suspense fallback={null}>
                        <DynamicTitle />
                      </Suspense>
                      {children}
                    </SnackbarProvider>
                  </SidebarProvider>
                </TooltipProvider>
              </SessionProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
