import { JSONContent } from "@tiptap/core";

export const reduceContent = (content: JSONContent[] | undefined) => {
  if (!content) {
    return "";
  }

  return content.reduce((acc, curr) => {
    if (curr.type === "text") {
      return acc + curr.text;
    }

    return acc;
  }, "");
};
