"use client";

import React, { useCallback } from "react";
import { type JSONContent, useEditor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TiptapEditor } from "@/components/editor";
import { extensionsConfig, editorExtensions } from "@/components/editor/config";
import { readingTime } from "@/lib/helpers/tiptap";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { reduceContent } from "@/lib/helpers/tiptap";
import { useRouter } from "next/navigation";
import { useProfile } from "@farcaster/auth-kit";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Editor: React.FC = () => {
  const { profile } = useProfile();
  const [channel, setChannel] = React.useState("");

  const [body, setBody] = React.useState<JSONContent | undefined>(undefined);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");

  const router = useRouter();

  const handleChangeTagInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
    },
    [],
  );

  const handleAddTag = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setTags((prevTags) => [...prevTags, tagInput]);
        setTagInput("");
      }

      return;
    },
    [tagInput],
  );

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  }, []);

  const handleUpdate = useCallback((body: JSONContent) => {
    setBody(body);
  }, []);

  const { mutate: create } = api.post.create.useMutation({
    onSuccess: (data) => {
      toast("success");

      const title =
        (body?.content![0]?.type === "heading"
          ? reduceContent(body?.content[0].content)
          : reduceContent(body?.content![1]?.content)) ?? "";

      const message = encodeURI(
        `${title} by "${profile?.displayName}" from `.concat("@farlonger"),
      );

      window.open(
        `https://warpcast.com/~/compose?text=${message}&embeds[]=https://farlonger.xyz/post/${data.cid}`,
        "_blank",
      );

      setTimeout(() => {
        router.push(`/post/${data.cid}`);
      }, 1000);
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
      metadata: {
        featuredImage:
          body.content![0]?.type === "image"
            ? (body.content![0]?.attrs?.src as string)
            : undefined,
        title:
          (body.content![0]?.type === "heading"
            ? reduceContent(body.content![0].content)
            : reduceContent(body.content![1]?.content)) ?? "",
        subtitle:
          (body.content![0]?.type === "heading"
            ? reduceContent(body.content![1]?.content)
            : reduceContent(body.content![2]?.content)) ?? "",
        channel,
        tags: tags.join(";"),
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: JSON.parse(JSON.stringify(body)),
    });
  }, [body]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 py-28 md:px-12 lg:px-24">
      <section className="flex w-full gap-12">
        <div className="basis-3/4">
          <TiptapEditor
            editor={editor}
            channel={channel}
            onSetChannel={setChannel}
          />
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
            <Separator />
            <div className="flex w-full flex-col items-start gap-1.5">
              <p className="text-sm font-bold">Tags</p>
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={handleChangeTagInput}
                onKeyDown={(e) => handleAddTag(e)}
              />
              <div className="mt-4 flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="flex cursor-pointer gap-2 rounded-full"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
