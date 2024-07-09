"use client";

import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/react";
import Feed from "./_components/feed";

export default function Home() {
  const { data: forYou, isLoading } = api.post.getLatest.useQuery();

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] w-full flex-col items-start justify-between p-4 pt-28 md:flex-row md:px-12 lg:px-24">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[calc(100%-200px)]">
        <Feed forYou={forYou ?? []} loading={isLoading ?? false} />
      </div>
      <Sidebar />
    </main>
  );
}
