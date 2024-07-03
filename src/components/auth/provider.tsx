"use client";

import { env } from "@/env";
import { AuthKitProvider } from "@farcaster/auth-kit";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthKitProvider
      config={{
        rpcUrl: env.NEXT_PUBLIC_FARCASTER_RPC_URL,
        domain: env.NEXT_PUBLIC_FARCASTER_DOMAIN,
        siweUri: env.NEXT_PUBLIC_FARCASTER_SIWE_URI,
      }}
    >
      {children}
    </AuthKitProvider>
  );
}
