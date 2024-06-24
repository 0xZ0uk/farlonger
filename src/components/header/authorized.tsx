import * as React from "react";
import { BellIcon, PenLineIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { AvatarMenu } from "./avatar-menu";

export const AuthorizedUser: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Button variant="ghost" size="icon" className="rounded-full">
        <SearchIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <BellIcon className="h-4 w-4" />
      </Button>
      <Button className="gap-2">
        <PenLineIcon className="h-4 w-4" />
        Write
      </Button>
      <AvatarMenu />
    </div>
  );
};
