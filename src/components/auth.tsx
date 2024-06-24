"use client";

import { useSignIn, useProfile, QRCode } from "@farcaster/auth-kit";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const Auth = () => {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();

  const { signIn } = useSignIn({
    onSuccess: ({ fid }) => console.log("Your fid:", fid),
  });

  if (isAuthenticated) return <div>Logged in as {username}</div>;

  return <Button onClick={() => signIn()}>Sign in with Farcaster</Button>;
};
