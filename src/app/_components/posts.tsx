import {
  BookmarkPlusIcon,
  HeartIcon,
  MessageCircleIcon,
  RefreshCcwIcon,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  posts: Post[];
  onBookmark: (id: string) => void;
  onRecast: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

export const Posts: React.FC<Props> = ({
  posts,
  onBookmark,
  onRecast,
  onLike,
  onComment,
}) => {
  return (
    <div className="flex min-h-96 w-full flex-col items-center gap-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          {...post}
          onBookmark={onBookmark}
          onRecast={onRecast}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
};

type Post = {
  id: string;
  channel: string;
  title: string;
  subtitle?: string;
  image?: string;
  likeCount: number;
  commentCount: number;
};

interface PostItemProps extends Post {
  onBookmark: (id: string) => void;
  onRecast: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  channel,
  title,
  subtitle,
  image,
  likeCount,
  commentCount,
  onBookmark,
  onRecast,
  onLike,
  onComment,
}) => {
  return (
    <div className="flex h-80 w-full items-center overflow-hidden rounded-lg border border-muted">
      <div className="flex h-full w-full basis-1/2 flex-col items-start justify-between p-6">
        <div className="h-fit w-fit cursor-pointer rounded-sm bg-muted px-2 py-1 text-xs text-foreground/80 hover:bg-primary">
          /{channel}
        </div>
        <Link href={`/cast/${id}`}>
          <h2 className="mt-2 cursor-pointer text-3xl font-bold hover:opacity-90">
            {title}
          </h2>
        </Link>
        <p className="mt-0 leading-relaxed text-muted-foreground">
          {subtitle
            ?.slice(0, 100)
            .trim()
            .concat(subtitle?.length > 100 ? "..." : "")}
        </p>
        <div className="flex items-center gap-2">
          <Button className="gap-1" size="sm" onClick={() => onRecast(id)}>
            <RefreshCcwIcon className="h-3.5 w-3.5" /> Recast
          </Button>
          <Button
            className="gap-1 px-3"
            variant="ghost"
            onClick={() => onLike(id)}
          >
            <HeartIcon className="h-3.5 w-3.5" /> {likeCount}
          </Button>
          <Button
            className="gap-1 px-3"
            variant="ghost"
            onClick={() => onComment(id)}
          >
            <MessageCircleIcon className="h-3.5 w-3.5" /> {commentCount}
          </Button>
          <Button
            className="gap-1"
            size="icon"
            variant="ghost"
            onClick={() => onBookmark(id)}
          >
            <BookmarkPlusIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex w-full basis-1/2 justify-end">
        <div className="aspect-square h-80 w-80 cursor-pointer overflow-hidden rounded-r-lg bg-muted bg-center">
          {!!image && (
            <Link href={`/cast/${id}`}>
              <Image
                src={image}
                alt={title}
                width={1080}
                height={1080}
                className="h-full w-full bg-contain bg-center"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.displayName = "PostItem";
