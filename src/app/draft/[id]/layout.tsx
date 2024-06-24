import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export default function DraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex h-12 w-full items-center justify-center border-b">
        <div className="flex w-10/12 items-center justify-end gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <EyeIcon className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">Publish</Button>
        </div>
      </div>
      {children}
    </div>
  );
}
