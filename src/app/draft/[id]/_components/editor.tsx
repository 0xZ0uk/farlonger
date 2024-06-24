"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import Heading from "@tiptap/extension-heading";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:prose-invert text-white",
      },
    },
    extensions: [
      CustomDocument,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-base",
          },
        },
      }),

      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Article Title...";
          }

          return "Type '/' for commands...";
        },
      }),
    ],
    content: `

    `,
  });

  return <EditorContent editor={editor} />;
};
