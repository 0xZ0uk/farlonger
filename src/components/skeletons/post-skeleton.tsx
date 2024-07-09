"use client";

import * as React from "react";
import {
  BookmarkPlusIcon,
  HeartIcon,
  MessageCircleIcon,
  RefreshCcwIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const PostSkeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col-reverse items-center overflow-hidden rounded-lg border border-muted md:h-80 md:flex-row">
      <div className="flex h-full w-full flex-col items-start justify-between p-6 md:basis-1/2">
        <Skeleton className="h-4 w-12" />
        <div>
          <Skeleton className="my-2 h-8 w-64" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div>
          <Button className="gap-1" size="sm" disabled>
            <RefreshCcwIcon className="h-3.5 w-3.5" /> Recast
          </Button>
          <Button className="gap-1 px-3" variant="ghost" disabled>
            <HeartIcon className="h-3.5 w-3.5" /> 0
          </Button>
          <Button className="gap-1 px-3" variant="ghost" disabled>
            <MessageCircleIcon className="h-3.5 w-3.5" /> 0
          </Button>
          <Button className="gap-1" size="icon" variant="ghost" disabled>
            <BookmarkPlusIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-end md:basis-1/2">
        <Skeleton className="h-80 min-w-96 cursor-pointer overflow-hidden rounded-t-lg bg-center md:h-80 md:rounded-l-none md:rounded-r-lg" />
      </div>
    </div>
  );
};
