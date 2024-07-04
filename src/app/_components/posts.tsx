/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import type { PinataPin } from "@pinata/sdk";
import { api } from "@/trpc/react";

interface Props {
  posts: PinataPin[];
}

export const Posts: React.FC<Props> = ({ posts }) => {
  const todo = () => {
    console.log("todo");
  };

  return (
    <div className="flex min-h-96 w-full flex-col items-center gap-4">
      {posts.map((post) => (
        <PostItem
          fid={(post.metadata.keyvalues as any).fid as string}
          key={post.id}
          id={post.ipfs_pin_hash}
          channel={(post.metadata.keyvalues as any).channel as string}
          title={(post.metadata.keyvalues as any).title as string}
          subtitle={(post.metadata.keyvalues as any).subtitle as string}
          image={(post.metadata.keyvalues as any).featuredImage as string}
          likeCount={(post.metadata.keyvalues as any).likeCount as number}
          commentCount={(post.metadata.keyvalues as any).commentCount as number}
          onBookmark={todo}
          onLike={todo}
          onComment={todo}
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
  fid: string;
};

interface PostItemProps extends Post {
  onBookmark: (id: string) => void;
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
  fid,
  commentCount,
  onBookmark,
  onLike,
  onComment,
}) => {
  const { data: user } = api.user.getUserByFID.useQuery({
    fid,
  });

  const handleRecast = React.useCallback(() => {
    if (!user) return;

    const message = encodeURI(
      `${title} by "${user?.display_name}" from `.concat("@farlonger"),
    );

    window.open(
      `https://warpcast.com/~/compose?text=${message}&embeds[]=https://farlonger.xyz/post/${id}`,
      "_blank",
    );
  }, [user, id, title]);

  return (
    <div className="flex h-80 w-full items-center overflow-hidden rounded-lg border border-muted">
      <div className="flex h-full w-full basis-1/2 flex-col items-start justify-between p-6">
        <Link href={`/channel/${channel}`}>
          <div className="h-fit w-fit cursor-pointer rounded-sm bg-muted px-2 py-1 text-xs text-foreground/80 hover:bg-primary">
            /{channel}
          </div>
        </Link>
        <Link href={`/post/${id}`}>
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
          <Button className="gap-1" size="sm" onClick={handleRecast}>
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
        {!!image && (
          <div className="h-80 min-w-96 cursor-pointer overflow-hidden rounded-r-lg bg-muted bg-center">
            <Link href={`/post/${id}`}>
              <Image
                src={image}
                alt={title}
                width={1080}
                height={1080}
                className="h-full w-full  object-cover"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.displayName = "PostItem";
