import * as React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookmarkPlusIcon,
  DeleteIcon,
  RefreshCcwIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useProfile } from "@farcaster/auth-kit";

interface PostCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    fid: number;
    name: string;
    avatar: string;
    username: string;
  };
  href: string;

  onDelete?: () => void;
  onBookmark?: () => void;
  onRecast?: () => void;
}

export default function PostCard(props: PostCardProps) {
  const {
    profile: { fid },
  } = useProfile();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image
            src={props.author.avatar}
            alt={props.author.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{props.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {props.author.username} - {props.date}
            </p>
          </div>
        </div>
      </CardHeader>
      <Link href={props.href}>
        <CardContent className="flex h-fit gap-8">
          <div className="basis-4/6 space-y-2">
            <CardTitle className="text-3xl font-bold">{props.title}</CardTitle>
            <CardDescription className="text-xl">
              {props.excerpt
                .slice(0, 255)
                .concat(props.excerpt.length > 255 ? "..." : "")}
            </CardDescription>
          </div>
          <div className="basis-2/6">
            <Image
              className="rounded-md"
              src={props.image}
              alt={props.title}
              width={320}
              height={200}
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <RefreshCcwIcon className="h-4 w-4" />
            Recast
          </Button>
          <p className="text-sm">88 likes</p>
          <p className="text-sm">2 comments</p>
        </div>
        <div className="flex gap-2">
          {props.author.fid === fid && props.onDelete && (
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-destructive"
              onClick={props.onDelete}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
          <Button size="icon" variant="ghost" className="rounded-full">
            <BookmarkPlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
