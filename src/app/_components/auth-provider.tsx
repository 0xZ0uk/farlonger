"use client";

import { AuthKitProvider, QRCode, useSignIn } from "@farcaster/auth-kit";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { url } = useSignIn({
    onSuccess: ({ fid }) => console.log("Your fid:", fid),
  });

  return (
    <AuthKitProvider
      config={{
        rpcUrl:
          "https://late-young-sailboat.optimism.quiknode.pro/569527c26d9fa3d680db2932d2a7c58ea5126e54/",
        domain: "localhost",
        siweUri: "https://localhost:3000/login",
      }}
    >
      {children}
      {!!url && <QRCode uri={url} />}
    </AuthKitProvider>
  );
}
