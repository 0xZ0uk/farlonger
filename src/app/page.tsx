"use client";
import { useEffect } from "react";

import { Posts } from "./_components/posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/react";

export default function Home() {
  const { data: posts } = api.post.getLatest.useQuery();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] items-start justify-between p-8 pt-28 sm:px-12 lg:px-24">
      <div className="absolute left-8 flex w-[calc(100%-4rem)] flex-col items-center justify-center gap-4 sm:left-12 md:w-[calc(100%-24rem-7rem)] lg:left-24 lg:w-[calc(100%-24rem-13rem)]">
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-1/3 grid-cols-3">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following" disabled>
              Following
            </TabsTrigger>
            <TabsTrigger value="featured" disabled>
              Featured
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you" className="w-full pb-28 pt-4">
            <Posts
              posts={posts ?? []}
              onBookmark={() => {
                console.log("bookmark");
              }}
              onRecast={() => {
                console.log("recast");
              }}
              onLike={() => {
                console.log("like");
              }}
              onComment={() => {
                console.log("comment");
              }}
            />
          </TabsContent>
          <TabsContent value="following"></TabsContent>
          <TabsContent value="featured"></TabsContent>
        </Tabs>
      </div>
      <Sidebar />
    </main>
  );
}
