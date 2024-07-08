import { ThemeProvider } from "@/components/layout/theme/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AuthProvider from "@/components/auth/provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import { mainMetadata } from "@/components/layout/metadata";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";
import { AppBar } from "@/components/layout/app-bar";

export const metadata = mainMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-w-screen min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <AppBar />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
