import { Button } from "@/components/ui/button";
import { reduceContent } from "@/lib/helpers/tiptap";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

interface TocItem {
  body: string;
  level: number;
}

interface TocProps {
  content: any[];
}

const generateToc = (content: any[]): TocItem[] => {
  return content
    .filter(
      (item: any) =>
        item.type === "heading" &&
        (item.attrs.level === 2 || item.attrs.level === 3),
    )
    .map((item: any) => ({
      body: reduceContent(item.content),
      level: item.attrs.level,
    }));
};

export const ReaderTOC: React.FC<TocProps> = ({ content }) => {
  if (!content.length) return null;

  const toc = generateToc(content);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Table of Contents</h2>
      <ul className="flex list-inside flex-col gap-2">
        {toc.map((item) => (
          <li
            key={item.body}
            className={cn(item.level === 3 ? "ml-8 text-base" : "text-lg")}
          >
            <Button className="w-full justify-start gap-2" variant="ghost">
              {item.level === 3 && <ChevronRightIcon className="h-4 w-4" />}{" "}
              {item.body}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
