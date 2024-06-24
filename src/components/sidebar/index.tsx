import * as React from "react";
import { SidebarDrafts } from "./drafts";
import { SidebarTrending } from "./trending";
import { SidebarCommentors } from "./commentors";
import { SidebarBookmarks } from "./bookmarks";
import { SidebarFooter } from "./footer";

export default function Sidebar() {
  return (
    <div className="flex w-full flex-col gap-4 pb-8">
      <SidebarDrafts
        drafts={[
          {
            title: "Draft 1",
            date: "20 ",
            href: "https://example.com",
          },
        ]}
      />
      <SidebarTrending
        trending={[
          {
            title:
              "How to make Hashnode like Scroll Aware Toolbar using Framer Motion",
            date: "20",
            href: "https://example.com",
          },
        ]}
      />
      <SidebarCommentors commentors={[]} />
      <SidebarBookmarks bookmarks={[]} />
      <SidebarFooter />
    </div>
  );
}
