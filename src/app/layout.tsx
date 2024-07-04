import { ThemeProvider } from "@/components/theme/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AuthProvider from "@/components/auth/provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";

export const metadata = {
  title: "Farlonger",
  description:
    "A sufficiently decentralized blogging platform built on Farcaster and IPFS.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
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
            <TRPCReactProvider>
              <div className="flex w-full justify-center">{children}</div>
            </TRPCReactProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
