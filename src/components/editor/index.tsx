import { EditorContent, type Editor } from "@tiptap/react";
import { EditorBubble } from "./editor-bubble";
import { EditorHeader } from "./editor-header";

interface Props {
  editor: Editor;
}

export const TiptapEditor: React.FC<Props> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <EditorBubble editor={editor} />
      <EditorHeader editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
