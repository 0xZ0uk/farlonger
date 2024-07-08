"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkPlusIcon,
  FacebookIcon,
  HeartIcon,
  Link2Icon,
  LinkedinIcon,
  MessageCircleIcon,
  Share2Icon,
  TwitterIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

interface Props {
  likeCount: number;
  commentCount: number;
  onRecast: () => void;
}

export const ReaderActions: React.FC<Props> = ({
  likeCount,
  commentCount,
  onRecast,
}) => {
  return (
    <div className="fixed bottom-20 flex h-16 w-full items-center justify-start gap-3 rounded-none border border-b-0 bg-muted px-3 md:bottom-8 md:w-fit  md:rounded-lg md:border-b">
      <Button className="gap-2" onClick={onRecast}>
        <Image src="/farcaster.svg" width={15} height={15} alt="Recast" />
        Recast
      </Button>
      <Separator orientation="vertical" className="dark:bg-border/50" />
      <Button variant="outline" className="gap-2">
        <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
        {commentCount}
      </Button>
      <Button variant="outline" className="gap-2">
        <HeartIcon className="h-5 w-5 text-muted-foreground" /> {likeCount}
      </Button>
      <Separator orientation="vertical" className="dark:bg-border/50" />
      <Button size="icon" variant="outline">
        <BookmarkPlusIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Share2Icon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="gap-2">
            <Link2Icon className="h-4 w-4 text-muted-foreground" />
            Link
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <TwitterIcon className="h-4 w-4 text-muted-foreground" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <LinkedinIcon className="h-4 w-4 text-muted-foreground" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <FacebookIcon className="h-4 w-4 text-muted-foreground" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">Reddit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
