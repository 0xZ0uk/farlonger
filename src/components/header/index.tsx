"use client";

import {
  SignInButton,
  type StatusAPIResponse,
  useProfile,
} from "@farcaster/auth-kit";
import { Navigation } from "./nav";
import { AuthorizedUser } from "./authorized";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useCallback, useState } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated } = useProfile();
  const [error, setError] = useState(false);
  const router = useRouter();

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
    await signIn("credentials", {
      message: res.message,
      signature: res.signature,
      name: res.username,
      pfp: res.pfpUrl,
      redirect: false,
      callbackUrl: "/",
    });

    router.refresh();
  }, []);

  return (
    <header className="flex h-16 items-center justify-center border-b border-muted-foreground/20 bg-muted">
      <div className="flex w-10/12 items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-bold">
            <span className="text-primary">Far</span>Longer
          </Link>
        </div>
        <div>
          <Navigation />
        </div>
        <div className="flex items-center gap-2">
          {!isAuthenticated && (
            <div className="scale-75">
              <SignInButton
                nonce={getNonce}
                onSuccess={handleSuccess}
                onError={() => setError(true)}
                onSignOut={() => signOut()}
              />
              {error && <div>Unable to sign in at this time.</div>}
            </div>
          )}
          <ModeToggle />
          {!!isAuthenticated && <AuthorizedUser />}
        </div>
      </div>
    </header>
  );
}
