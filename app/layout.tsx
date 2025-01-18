'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './globals.css';
import './globals-custom.css';

import { ThemeProvider } from '@/utils/theme-provider';
import DarkmodeToggle from '@/components/DarkmodeToggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import Headers from '@/components/layout/Header/Headers';

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
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
      </body>
    </html>
  );
}
