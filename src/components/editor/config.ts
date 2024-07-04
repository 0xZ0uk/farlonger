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
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TaskItem from "@tiptap/extension-task-item";
import Strike from "@tiptap/extension-strike";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Youtube from "@tiptap/extension-youtube";

import { CommandsExtension } from "./extensions/commands";
import suggestion from "./extensions/commands/suggestion";

const CustomDocument = Document.extend({
  content: "image* heading block*",
});

export const editorExtensions = [
  // Custom
  CustomDocument,
  CommandsExtension.configure({
    suggestion,
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
  Dropcursor.configure({
    class: "cursor-grab h-[5px]",
  }),
  CharacterCount,
];

export const extensionsConfig = [
  // Configured
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: "font-bold",
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
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "!my-2",
    },
  }),
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class:
        "rounded-lg max-h-[650px] max-w-[1200px] object-cover w-full object-top",
    },
  }),
  // Default
  Text,
  Underline,
  Bold,
  Italic,
  Document,
  Blockquote,
  BulletList,
  ListItem,
  TaskItem,
  Strike,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Youtube,
];
