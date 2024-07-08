"use client";

import * as React from "react";

import { Bookmarks } from "./bookmarks";
import { Welcome } from "./welcome";
import { Footer } from "./footer";
import { Drafts } from "./drafts";

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed right-8 hidden min-h-[calc(100vh-9rem-1px)] flex-col gap-4 border-l  border-muted pl-4 sm:right-12 sm:hidden sm:w-0 md:flex md:w-96 lg:right-24">
      <Welcome />
    </div>
  );
};
