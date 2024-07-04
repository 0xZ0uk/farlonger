"use client";

import { Document } from "@tiptap/extension-document";

import { api } from "@/trpc/react";
import { generateHTML } from "@tiptap/react";
import React, { useMemo } from "react";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Underline from "@tiptap/extension-underline";

interface Props {
  cid: string;
}

export const Reader: React.FC<Props> = ({ cid }) => {
  const { data: post } = api.post.getPostByCID.useQuery({
    cid,
  });

  const output = useMemo(() => {
    if (!post) return null;

    return generateHTML(post, [
      Document,
      Blockquote,
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-relaxed text-base",
        },
      }),
      Text.configure({
        HTMLAttributes: {
          class: "text-lg w-2/3",
        },
      }),
      Bold,
      Code.configure({
        HTMLAttributes: {
          class: "code font-mono bg-muted text-muted-foreground",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["https"],
      }),
      Italic,
      Highlight.configure({
        multicolor: true,
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "!my-2",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class:
            "rounded-lg max-h-[650px] max-w-[1200px] object-cover w-full object-top",
        },
      }),
      Underline,
    ]);
  }, [post]);

  if (!post) return null;
  if (!output) return null;

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="prose !w-full max-w-none dark:prose-invert prose-h1:text-center prose-h1:text-6xl prose-p:mx-auto prose-p:w-2/3"
      />
    </div>
  );
};
