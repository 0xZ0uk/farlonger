"use client";

import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/react";
import Feed from "./_components/feed";

export default function Home() {
  const { data: recent, isLoading: isRecentLoading } =
    api.post.getLatest.useQuery();
  const { data: featured, isLoading: isFeaturedLoading } =
    api.post.getByUserFID.useQuery({ fid: "762749" });

  const loading = isRecentLoading || isFeaturedLoading;

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] w-full flex-col items-start justify-between gap-4 p-4 pt-28 md:flex-row md:px-12 lg:px-24">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[calc(100%-200px)]">
        <Feed
          recent={recent ?? []}
          featured={featured ?? []}
          loading={loading}
        />
      </div>
      <Sidebar />
    </main>
  );
}
