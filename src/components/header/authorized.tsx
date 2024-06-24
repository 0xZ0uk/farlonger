import * as React from "react";
import { BellIcon, PenLineIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { AvatarMenu } from "@/components/header/avatar-menu";

export const AuthorizedUser: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Button variant="ghost" size="icon" className="rounded-full">
        <SearchIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <BellIcon className="h-4 w-4" />
      </Button>
      <Link href={`/draft/${nanoid()}`}>
        <Button className="gap-2">
          <PenLineIcon className="h-4 w-4" />
          Write
        </Button>
      </Link>
      <AvatarMenu />
    </div>
  );
};
