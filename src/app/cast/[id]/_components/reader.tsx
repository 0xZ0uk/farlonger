"use client";

import { Document } from "@tiptap/extension-document";

import { api } from "@/trpc/react";
import { generateHTML } from "@tiptap/react";
import React, { useMemo } from "react";
import { extensionsConfig } from "@/components/editor/config";

interface Props {
  cid: string;
}

export const Reader: React.FC<Props> = ({ cid }) => {
  const { data: post } = api.post.getPostByCID.useQuery({
    cid,
  });

  const output = useMemo(() => {
    if (!post) return null;

    return generateHTML(post, [Document, ...extensionsConfig]);
  }, [post]);

  if (!post) return null;
  if (!output) return null;

  return (
    <div className="flex min-h-screen w-full">
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose mx-auto max-w-[1200px] dark:prose-invert prose-h1:text-center prose-h1:text-6xl prose-p:w-2/3"
      />
    </div>
  );
};
