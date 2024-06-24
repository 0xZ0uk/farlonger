"use client";

import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { Navigation } from "./nav";
import { AuthorizedUser } from "./authorized";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default function Header() {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();

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
          <ModeToggle />
          {!!isAuthenticated && <AuthorizedUser />}
          {!isAuthenticated && (
            <div className="scale-75">
              <SignInButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
