"use client";

import { Document } from "@tiptap/extension-document";

import { generateHTML } from "@tiptap/react";
import React, { useEffect, useMemo } from "react";
import { extensionsConfig } from "@/components/editor/config";
import { reduceContent } from "@/lib/tiptap-helpers";
import Image from "next/image";
import { api } from "@/trpc/react";
import Link from "next/link";

interface Props {
  post: any;
}

export const Reader: React.FC<Props> = ({ post }) => {
  const { data: user } = api.user.getUserByFID.useQuery({
    fid: post.metadata.fid,
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
      <div className="flex items-center gap-2">
        <Image
          src={user.pfp_url ?? "https://warpcast.com/avatar.png"}
          alt={user.display_name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-bold">{user.display_name}</p>
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
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose mx-auto w-2/3 max-w-[1200px] dark:prose-invert"
      />
    </div>
  );
};
