import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkPlusIcon,
  HeartIcon,
  MessageCircleIcon,
  Share2Icon,
} from "lucide-react";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flexs w-full flex-col items-center justify-start">
      {children}
    </div>
  );
}
