'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './globals.css';
import './globals-custom.css';

import { useEffect } from 'react';

import { ThemeProvider } from '@/utils/theme-provider';
import DarkmodeToggle from '@/components/DarkmodeToggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import Headers from '@/components/layout/Header/Headers';
import { DeviceTypeProvider } from '@/contexts/DeviceTypeContext';
import useUserStore from '@/store/useUser.store';

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initializeUserData = useUserStore((state) => state.initializeUserData);

  useEffect(() => {
    initializeUserData(); // Zustand 상태 초기화
  }, [initializeUserData]);

  return (
    <html lang="ko">
      <body>
        <DeviceTypeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryClient}>
              <SidebarProvider defaultOpen={true}>
                <Headers />
                <DarkmodeToggle />
                {children}
              </SidebarProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
