import { EditorContent, type Editor } from "@tiptap/react";
import { EditorBubble } from "./editor-bubble";
import { EditorHeader } from "./editor-header";

interface Props {
  editor: Editor;
  channel?: string;
  onSetChannel: (channel: string) => void;
}

export const TiptapEditor: React.FC<Props> = ({
  editor,
  channel,
  onSetChannel,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <EditorBubble editor={editor} />
      <EditorHeader
        editor={editor}
        channel={channel}
        onSetChannel={onSetChannel}
      />
      <EditorContent editor={editor} />
    </div>
  );
};
