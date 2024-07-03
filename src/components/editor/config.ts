import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { CommandsExtension } from "./extensions/commands";
import suggestion from "./extensions/commands/suggestion";

const CustomDocument = Document.extend({
  content: "image heading block* ",
});

export const extensionsConfig = [
  // Custom
  CustomDocument,
  CommandsExtension.configure({
    suggestion,
  }),

  // Configured
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: "font-bold",
    },
  }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    considerAnyAsEmpty: true,
    showOnlyCurrent: false,
    includeChildren: true,
    placeholder: ({ node, pos }) => {
      if (node.type.name === "heading" && node.attrs.level === 1) {
        return "Article Title...";
      }

      return "Type '/' for commands.";
    },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: "leading-relaxed text-base",
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
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
  Dropcursor.configure({
    class: "cursor-grab h-[5px]",
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "!my-2",
    },
  }),

  // Default
  Image,
  Text,
  CharacterCount,
  Underline,
  Bold,
  Italic,
];
