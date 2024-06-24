import "@/styles/globals.css";
import "@farcaster/auth-kit/styles.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./_components/auth-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "FarLonger",
  description: "Farcaster but longer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <TRPCReactProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
