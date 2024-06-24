"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:prose-invert",
      },
    },
    extensions: [
      CustomDocument,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "font-bold placeholder:text-muted-foreground",
        },
      }),
      Paragraph,
      Text,
      Placeholder.configure({
        showOnlyWhenEditable: false,
        considerAnyAsEmpty: true,
        showOnlyCurrent: false,
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Article Title...";
          }

          return "Type '/' for commands.";
        },
      }),
    ],
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};
