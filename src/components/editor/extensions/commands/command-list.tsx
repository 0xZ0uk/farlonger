/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import type { Range, Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  editor: Editor;
  items: {
    title: string;
    command: (args: { editor: Editor; range: Range }) => void;
  }[];
  command: (item: { title: string }) => void;
  clientRect?: DOMRect;
  onKeyDown?: (props: any) => boolean;
}

export const CommandList: React.FC<Props> = ({
  editor,
  items,
  command,
  clientRect,
  onKeyDown,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const upHandler = useCallback(() => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  }, [selectedIndex, items.length]);

  const downHandler = useCallback(() => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  }, [selectedIndex, items.length]);

  const enterHandler = useCallback(() => {
    selectItem(selectedIndex);
  }, [selectedIndex]);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [items, command],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowUp") {
        upHandler();
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        downHandler();
        event.preventDefault();
      } else if (event.key === "Enter") {
        enterHandler();
        event.preventDefault();
      }
    },
    [upHandler, downHandler, enterHandler],
  );

  useEffect(() => {
    if (onKeyDown) {
      onKeyDown({
        event: handleKeyDown,
        editor,
      });
    }
  }, [onKeyDown, handleKeyDown, editor]);

  return (
    <div
      className="flex flex-col justify-start rounded-lg border bg-background p-2"
      onKeyDown={handleKeyDown}
    >
      {items.length ? (
        items.map((item, index) => (
          <Button
            key={index}
            size="sm"
            variant="ghost"
            className={cn(
              "flex w-[150px] items-center justify-between px-2 py-0",
              index === selectedIndex && "",
            )}
            onClick={() => selectItem(index)}
          >
            {item.title}
          </Button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
};
