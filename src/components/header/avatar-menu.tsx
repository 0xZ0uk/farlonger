import * as React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile, useSignIn } from "@farcaster/auth-kit";
import Link from "next/link";

export const AvatarMenu: React.FC = () => {
  const {
    profile: { username, pfpUrl },
  } = useProfile();

  const { signOut } = useSignIn({
    onSuccess: () => console.log("signed out"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={pfpUrl} />
          <AvatarFallback>{username?.substring(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={signOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
