import type { JSONContent } from "@tiptap/core";

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

export const readingTime = (characterCount: number) => {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(characterCount / wordsPerMinute);

  return readingTime;
};
