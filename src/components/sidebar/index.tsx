"use client";

import * as React from "react";

import { Bookmarks } from "./bookmarks";
import { Welcome } from "./welcome";
import { Footer } from "./footer";
import { Drafts } from "./drafts";

export const Sidebar: React.FC = () => {
  return (
    <div className="right-8 hidden min-h-[calc(100vh-9rem-1px)] w-0 flex-col gap-4 border-l border-muted pl-4 md:flex md:w-96">
      <Welcome />
    </div>
  );
};
