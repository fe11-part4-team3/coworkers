'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/utilities.css';

import { ThemeProvider } from '@/utils/theme-provider';
import DarkmodeToggle from '@/components/DarkmodeToggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import Headers from '@/components/layout/Header/Headers';
import { DeviceTypeProvider } from '@/contexts/DeviceTypeContext';
import Modal from '@/components/modal/Modal';

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <SidebarProvider defaultOpen={false}>
                <Headers />
                <DarkmodeToggle />
                <Modal />
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
