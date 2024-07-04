import * as React from "react";
import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const EditorHeader: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleAddImage = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          editor
            .chain()
            .focus("start")
            .setImage({ src: reader.result as string, alt: file.name })
            .run();
        };
      }
    },
    [editor],
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"sm"} className="gap-2 rounded-full">
              <ImageIcon className="h-4 w-4" />
              Add Cover
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[800px]">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-[300px] grid-cols-2">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="moshicam" disabled>
                  Moshicam
                </TabsTrigger>
              </TabsList>
              <Separator className="my-2" />
              <TabsContent value="upload">
                <div className="flex items-center justify-center">
                  <input
                    className="flex w-full items-center justify-center rounded-lg border-2 border-dashed p-12 text-center text-sm text-muted-foreground file:h-0 file:w-0 file:opacity-0"
                    placeholder="Click or drag and drop your image here"
                    type="file"
                    onChange={handleAddImage}
                  />
                </div>
              </TabsContent>
              <TabsContent value="moshicam"></TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
