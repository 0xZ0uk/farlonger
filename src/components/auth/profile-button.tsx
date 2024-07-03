import * as React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useProfile } from "@farcaster/auth-kit";
import Image from "next/image";
import { ChevronDown, LogOutIcon } from "lucide-react";

interface UserDataProps {
  fid?: number;
  pfpUrl?: string;
  username?: string;
}

interface Props {
  userData?: UserDataProps;
  signOut?: () => void;
  hideSignOut?: boolean;
}

export const ProfileButton: React.FC<Props> = ({
  signOut,
  hideSignOut = false,
}) => {
  const ref = React.useRef(null);

  const {
    profile: { pfpUrl, displayName: name, username },
  } = useProfile();

  return (
    <div ref={ref}>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit">
          <div className="flex w-full items-center justify-center gap-2 rounded-lg border p-2">
            <Image
              src={pfpUrl ?? "https://warpcast.com/avatar.png"}
              alt="Profile Picture"
              width={25}
              height={25}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Bookmarks</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          {!hideSignOut && (
            <DropdownMenuItem className="gap-1 text-red-500" onClick={signOut}>
              <LogOutIcon className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
