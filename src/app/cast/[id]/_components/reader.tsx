"use client";

import { Document } from "@tiptap/extension-document";

import { api } from "@/trpc/react";
import { generateHTML } from "@tiptap/react";
import React, { useMemo } from "react";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";

interface Props {
  cid: string;
}

export const Reader: React.FC<Props> = ({ cid }) => {
  const { data: post } = api.post.getPostByCID.useQuery({
    cid,
  });

  const output = useMemo(() => {
    if (!post) return null;

    return generateHTML(post, [Document, Paragraph, Text, Heading, Image]);
  }, [post]);

  if (!post) return null;
  if (!output) return null;

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose !w-full max-w-none dark:prose-invert prose-h1:text-center prose-h1:text-6xl"
      />
    </div>
  );
};
