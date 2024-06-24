"use client";

import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { Button } from "@/components/ui/button";
import { Navigation } from "./nav";
import { PenLineIcon } from "lucide-react";

export default function Header() {
  const {
    // isAuthenticated,
    profile: { username, fid },
  } = useProfile();

  const isAuthenticated = true;

  return (
    <header className="flex items-center justify-between border-b border-muted-foreground/20 bg-muted px-8 py-2">
      <div>
        <p className="font-bold">FarLonger</p>
      </div>
      <div>
        <Navigation />
      </div>
      <div className="flex items-center gap-2">
        {!!isAuthenticated && (
          <Button className="gap-2">
            <PenLineIcon className="h-4 w-4" />
            Write
          </Button>
        )}
        {!isAuthenticated ? (
          <div className="scale-75">
            <SignInButton />
          </div>
        ) : (
          <div>{username}</div>
        )}
      </div>
    </header>
  );
}
