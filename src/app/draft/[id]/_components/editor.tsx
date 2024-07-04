"use client";

import React, { useCallback } from "react";
import { type JSONContent, useEditor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TiptapEditor } from "@/components/editor";
import { extensionsConfig, editorExtensions } from "@/components/editor/config";
import { readingTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export const Editor: React.FC = () => {
  const [body, setBody] = React.useState<JSONContent | undefined>(undefined);

  const handleUpdate = useCallback((body: JSONContent) => {
    setBody(body);
  }, []);

  const { mutate: create } = api.post.create.useMutation({
    onSuccess: () => {
      toast("success");
    },
    onError: (error) => {
      toast(`error: ${error.message}`);
    },
  });

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none dark:prose-invert",
      },
    },
    extensions: [...extensionsConfig, ...editorExtensions],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      handleUpdate(json);
    },
    content: "<h1></h1><p></p>",
  });

  const handleSubmit = useCallback(async () => {
    if (!body) {
      return;
    }

    create({
      featuredImage: (body.content![0]?.attrs?.src as string) ?? "",
      title: body.content![1]?.content![0]?.text ?? "",
      subtitle: body.content![2]?.content![0]?.text ?? "",
      body: JSON.parse(JSON.stringify(body)),
    });
  }, [body]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 py-28 sm:px-12 lg:px-24">
      <section className="flex w-full gap-12">
        <div className="basis-3/4">
          <TiptapEditor editor={editor} />
        </div>
        <div className="min-h-[calc(100vh-9rem-1px)] w-full basis-1/4 border-l pl-4">
          <div className="flex h-fit w-full flex-col gap-4 rounded-lg">
            <Button onClick={handleSubmit}>Cast</Button>
            <Button variant="outline">Preview</Button>
            <Separator />
            <div className="flex w-full flex-col items-start gap-1.5">
              <p className="text-sm font-bold">Word Counter</p>
              <div className="bg-mute flex h-10 w-full items-center rounded-md border border-muted-foreground/10 p-2">
                <p className="text-base">
                  {editor.storage.characterCount.characters()}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-1.5">
              <p className="text-sm font-bold">Reading Time</p>
              <div className="bg-mute flex h-10 w-full items-center rounded-md border border-muted-foreground/10 p-2">
                <p className="text-base">
                  {readingTime(
                    editor.storage.characterCount.characters() as number,
                  )}{" "}
                  min
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
