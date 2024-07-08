"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import {
  BookmarkIcon,
  HomeIcon,
  PlusIcon,
  RssIcon,
  UserCircleIcon,
} from "lucide-react";

export const AppBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex h-20 w-full flex-row items-center justify-center border-t bg-background md:hidden md:h-0">
      <Button
        variant="ghost"
        size="icon"
        className="aspect-square h-full w-full basis-1/5 rounded-none"
      >
        <HomeIcon className="h-8 w-8" />
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant="ghost"
        size="icon"
        className="aspect-square h-full w-full basis-1/5 rounded-none"
      >
        <RssIcon className="h-8 w-8" />
      </Button>
      <div className="w-full basis-1/5">
        <Button className="aspect-square h-full w-full rounded-full">
          <PlusIcon className="h-8 w-8" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="aspect-square h-full w-full basis-1/5 rounded-none"
      >
        <BookmarkIcon className="h-8 w-8" />
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant="ghost"
        size="icon"
        className="aspect-square h-full w-full basis-1/5 rounded-none"
      >
        <UserCircleIcon className="h-8 w-8" />
      </Button>
    </div>
  );
};
