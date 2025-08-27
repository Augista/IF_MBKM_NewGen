"use client";
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { usePathname } from "next/navigation";
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";
import { Figtree, Inter } from "@/lib/font";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const routesWithSidebar = [
      "/",
    ];

    const shouldShowSidebar = routesWithSidebar.some(route => pathname === route || pathname.startsWith(route));

    setShowSidebar(shouldShowSidebar);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=4" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" />
        <link rel="shortcut icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn(
        Inter.variable,
        Figtree.variable,
      )}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              <AppSidebar />
              <main className={`
              flex-grow transition-all duration-200
              ${showSidebar ? 'md:ml-24 lg:ml-64 mt-16 md:mt-0' : ''}
            `}
              >
                {children}
              </main>
            </SidebarProvider>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}