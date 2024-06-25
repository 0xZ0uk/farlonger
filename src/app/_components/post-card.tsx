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
import { BookmarkPlusIcon, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  href: string;
}

export default function PostCard(props: PostCardProps) {
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
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>
              {props.excerpt
                .slice(0, 100)
                .concat(props.excerpt.length > 100 ? "..." : "")}
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
        <div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <BookmarkPlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
