/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BubbleMenu, type Editor } from "@tiptap/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  UnderlineIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

export const EditorBubble: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (editor.isActive("image")) return <></>;

  return (
    <BubbleMenu
      className="flex items-center gap-0.5 rounded-lg border bg-background p-1"
      tippyOptions={{ duration: 100, placement: "top-start" }}
      editor={editor}
    >
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "outline"}
        size="icon"
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "outline"}
        size="icon"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={editor.isActive("underline") ? "default" : "outline"}
        size="icon"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-8 w-px bg-muted" />
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive("heading1") ? "default" : "outline"}
        size="icon"
      >
        <Heading1Icon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor.isActive("heading2") ? "default" : "outline"}
        size="icon"
      >
        <Heading2Icon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor.isActive("heading3") ? "default" : "outline"}
        size="icon"
      >
        <Heading3Icon className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-8 w-px bg-muted" />
      <EditorBubbleLinkPopover editor={editor} />
      <Button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#7d66c2" }).run()
        }
        variant={editor.isActive("highlight") ? "default" : "outline"}
        size="icon"
      >
        <HighlighterIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "default" : "outline"}
        size="icon"
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
    </BubbleMenu>
  );
};

const EditorBubbleLinkPopover: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [href, setHref] = React.useState<string | undefined>(
    editor.getAttributes("link").href as string,
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleClear = React.useCallback(() => {
    editor.chain().focus().unsetLink().run();
    handleClose();
  }, [editor, href, handleClose]);

  const handleSubmit = React.useCallback(() => {
    if (href) editor.chain().focus().setLink({ href }).run();
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, href]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger className="flex items-center gap-1" asChild>
        <Button
          variant={editor.isActive("link") ? "default" : "outline"}
          size="icon"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="mt-2 flex min-w-[420px] flex-col gap-1 rounded-md border p-2"
      >
        <input
          type="text"
          placeholder="https://"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
        />
        <div className="flex w-full flex-col gap-1">
          {!editor.getAttributes("link").href && (
            <Button onClick={handleSubmit}>Insert Link</Button>
          )}
          {!!editor.getAttributes("link").href && (
            <Button variant="outline" onClick={handleClear}>
              Clear Link
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
