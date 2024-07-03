"use client";

import * as React from "react";
import { BookmarkIcon, ExternalLinkIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BookmarksProps {
  bookmarks: string[];
}

export const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks }) => {
  return (
    <div className="h-fit w-full rounded-lg border p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5" />
          <h3 className="text-xl font-bold">Bookmarks</h3>
        </div>
        <Button size="sm">See all</Button>
      </div>
      <div className="mt-4 space-y-2">
        <BookmarkItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </BookmarkItem>
        <BookmarkItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </BookmarkItem>
        <BookmarkItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </BookmarkItem>
      </div>
    </div>
  );
};

const BookmarkItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Button className="group w-full justify-between" variant="outline">
      <div className="flex items-center gap-2">
        <StarIcon className="h-4 w-4" />
        {children
          .slice(0, 32)
          .trim()
          .concat(children.length > 32 ? "..." : "")}
      </div>
      <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
    </Button>
  );
};
