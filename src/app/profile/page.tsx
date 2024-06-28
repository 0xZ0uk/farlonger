import React from "react";
import { HeartIcon, MessageCircleIcon, SparklesIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { Posts } from "@/app/_components/posts";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Profile() {
  const session = await getServerAuthSession();

  if (session) {
    console.log("session::", session);
  }

  const pins = await api.ipfs.getUserPosts();

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="mt-12 flex w-10/12 gap-8">
        <div className="basis-2/3">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="for-you" className="gap-2">
                <SparklesIcon className="h-4 w-4" />
                My Posts
              </TabsTrigger>
              <TabsTrigger value="featured" className="gap-2" disabled>
                <MessageCircleIcon className="h-4 w-4" />
                My Comments
              </TabsTrigger>
              <TabsTrigger value="following" className="gap-2" disabled>
                <HeartIcon className="h-4 w-4" />
                My Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              {!session ? <div>NOT FOUND</div> : <Posts posts={pins} />}
            </TabsContent>
            <TabsContent value="featured">Featured (coming soon)</TabsContent>
            <TabsContent value="following">Following (coming soon)</TabsContent>
          </Tabs>
        </div>
        <div className="flex basis-1/3 flex-col gap-4">
          <Sidebar />
        </div>
      </section>
    </main>
  );
}
