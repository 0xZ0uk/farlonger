"use client";

import { Document } from "@tiptap/extension-document";

import { generateHTML } from "@tiptap/react";
import React, { useCallback, useMemo } from "react";
import { extensionsConfig } from "@/components/editor/config";
import { reduceContent } from "@/lib/helpers/tiptap";
import Image from "next/image";
import { api } from "@/trpc/react";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { BookIcon } from "lucide-react";
import { readingTime } from "@/lib/helpers/tiptap";
import { ReaderActions } from "./reader-actions";

interface Props {
  post: any;
  cid: string;
}

export const Reader: React.FC<Props> = ({ post, cid }) => {
  const { data: user } = api.user.getUserByFID.useQuery({
    fid: parseInt(post.metadata.fid),
  });

  const render = post?.content.filter((_item: any, idx: number) => idx > 1);

  const output = useMemo(() => {
    if (!post) return null;

    return generateHTML(
      {
        type: post.type,
        content: render,
      },
      [Document, ...extensionsConfig],
    );
  }, [post]);

  const content = post.content.filter((item: any) => item.type !== "image");
  const contentContents = content.map((item: any) => item.content);
  const charCount = contentContents.reduce((acc: number, item: any) => {
    return reduceContent(item).length + acc;
  }, 0);

  const readTime = readingTime(charCount);

  const handleRecast = useCallback(() => {
    if (!post) return;

    const message = encodeURI(
      `${title} by "@${user?.username}" read at `.concat("@farlonger"),
    );

    window.open(
      `https://warpcast.com/~/compose?text=${message}&embeds[]=https://farlonger.xyz/post/${cid}`,
      "_blank",
    );
  }, [post, user]);

  if (!post) return null;
  if (!output) return null;
  if (!user) return null;

  const image =
    post.content[0].type === "image" ? post.content[0].attrs : undefined;
  const title =
    post.content[0].type === "image"
      ? reduceContent(post.content[1].content)
      : reduceContent(post.content[0].content);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12 pb-36">
      {post.content[0].type === "image" && (
        <Image
          src={image.src}
          alt={title}
          width={1200}
          height={650}
          className="max-h-[650px] w-full max-w-[1200px] rounded-lg object-cover object-top"
        />
      )}
      <h1 className="text-6xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={user.pfp ?? "https://warpcast.com/avatar.png"}
            alt={user.username}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-bold">{user.username}</p>
            <div className="flex gap-2 text-sm">
              <Link
                className="text-sm font-semibold text-primary"
                href={`https://farlonger.xyz/user/${user.username}`}
              >
                @{user.username}
              </Link>
              <Link
                className="text-sm underline"
                href={`https://warpcast.com/${user.username}`}
                target="_blank"
              >
                Warpcast
              </Link>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-1 h-8 w-px bg-muted" />
        <div>{format(new Date(post.metadata.createdAt), "MMMM dd, yyyy")}</div>
        <Separator orientation="vertical" className="mx-1 h-8 w-px bg-muted" />
        <div className="flex items-center gap-2">
          <BookIcon className="h-6 w-6" />
          <p>
            {readTime} {readTime === 1 ? "min" : "mins"} read
          </p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose mx-auto w-2/3 max-w-[1200px] dark:prose-invert"
      />
      <ReaderActions
        onRecast={handleRecast}
        likeCount={post.metadata.likeCount}
        commentCount={post.metadata.commentCount}
      />
    </div>
  );
};
