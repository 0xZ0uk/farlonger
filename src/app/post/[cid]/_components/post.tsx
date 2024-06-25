"use client";

import { api } from "@/trpc/react";
import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import type { Post as PostType } from "@/types/core";

interface PostProps {
  cid: string;
}

export default function Post({ cid }: PostProps) {
  const { data: post } = api.ipfs.getByCID.useQuery({
    cid,
  });

  const output = useMemo(() => {
    if (!post?.content) return null;

    return generateHTML(
      JSON.parse(JSON.stringify((post as PostType).content)),
      [Document, Paragraph, Text, Heading, Image],
    );
  }, [post]);

  if (!post) return null;
  if (!output) return null;

  return (
    <div className="mt-12 flex w-10/12 flex-col items-center gap-8">
      <section className="h-96 w-2/3 rounded-lg bg-muted"></section>
      <section className="mt-12 w-2/3">
        <div
          dangerouslySetInnerHTML={{ __html: output }}
          className="prose dark:prose-invert prose-h1:text-6xl prose-h1:text-center !w-full max-w-none"
        />
      </section>
    </div>
  );
}
