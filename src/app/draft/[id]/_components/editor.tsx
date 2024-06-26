/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import React from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, ImageIcon } from "lucide-react";
import { api } from "@/trpc/react";
import { useProfile } from "@farcaster/auth-kit";
import { useRouter } from "next/navigation";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC = () => {
  const { profile } = useProfile();
  const router = useRouter();

  const [content, setContent] = React.useState<JSONContent | undefined>(
    undefined,
  );

  const { mutate: storeIPFS } = api.ipfs.pin.useMutation({
    onSuccess: (data) => {
      window.open(
        `https://warpcast.com/~/compose?text=Read%20this%20post%20on%20FarLonger&fid=${profile?.fid}!&embeds[]=https://farlonger.vercel.app/post/${data.cid}`,
        "_blank",
      );

      router.push(`/post/${data.cid}`);
    },
  });

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none dark:prose-invert",
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
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-relaxed text-base",
        },
      }),
      Text,
      Image,
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
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      // send the content to an API here
      setContent(json);
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handlePublish = () => {
    storeIPFS({
      title: (content?.content![0] as any)?.content![0]?.text || "",
      excerpt: (content?.content![1] as any)?.content![0]?.text || "",
      content,
    });
  };

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full">
        <div className="flex h-12 w-full items-center justify-center border-b">
          <div className="flex w-10/12 items-center justify-end gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <EyeIcon className="h-4 w-4" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={!content || content.content!.length < 2}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
      <section className="flex w-10/12 gap-12">
        <div className="h-[calc(100vh-6rem)] basis-1/4 border-r"></div>
        <div className="basis-3/4 pt-12">
          <div className="mb-12">
            <div className="button-group">
              <Button
                size={"sm"}
                className="gap-2 rounded-full"
                onClick={addImage}
              >
                <ImageIcon className="h-4 w-4" />
                Add Cover
              </Button>
            </div>
          </div>
          <EditorContent editor={editor} />
        </div>
      </section>
    </main>
  );
};
