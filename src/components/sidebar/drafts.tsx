"use client";

import * as React from "react";
import { EditIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DraftsProps {
  drafts: string[];
}

export const Drafts: React.FC<DraftsProps> = ({}) => {
  return (
    <div className="h-fit w-full rounded-lg border p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">Drafts (1)</h3>
        </div>
        <Button size="sm">See all</Button>
      </div>
      <div className="mt-4 space-y-2">
        <DraftItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </DraftItem>
        <DraftItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </DraftItem>
        <DraftItem>
          Building Farlonger: A Decentralized Blogging Platform on Farcaster
        </DraftItem>
      </div>
    </div>
  );
};

const DraftItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="flex cursor-pointer items-center justify-between">
      <div className="flex flex-col items-start">
        <h4 className="text-lg font-medium hover:text-muted-foreground">
          {children
            .slice(0, 25)
            .trim()
            .concat(children.length > 25 ? "..." : "")}
        </h4>
        <p className="text-sm text-muted-foreground">Last edited 1 day ago</p>
      </div>
      <EditIcon className="h-4 w-4" />
    </div>
  );
};
