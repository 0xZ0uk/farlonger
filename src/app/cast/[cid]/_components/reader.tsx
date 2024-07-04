"use client";

import { Document } from "@tiptap/extension-document";

import { generateHTML } from "@tiptap/react";
import React, { useMemo } from "react";
import { extensionsConfig } from "@/components/editor/config";
import { reduceContent } from "@/lib/tiptap-helpers";
import Image from "next/image";

interface Props {
  post: any;
}

export const Reader: React.FC<Props> = ({ post }) => {
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

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12 pb-28">
      {post.content[0].type === "image" && (
        <Image
          src={post.content[0].attrs.src}
          alt={post.content[0].alt}
          width={1200}
          height={650}
          className="max-h-[650px] w-full max-w-[1200px] rounded-lg object-cover object-top"
        />
      )}
      <h1 className="text-6xl font-bold">
        {reduceContent(post.content[1].content)}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose mx-auto w-2/3 max-w-[1200px] dark:prose-invert"
      />
    </div>
  );
};
