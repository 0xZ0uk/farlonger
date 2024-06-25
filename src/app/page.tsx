"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "./_components/post-card";
import { BookmarkIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";
import React, { useEffect } from "react";
import { api } from "@/trpc/react";

export default function Home() {
  const { data: pins } = api.ipfs.getAllPinned.useQuery();

  useEffect(() => {
    console.log("pins::", pins);
  }, [pins]);

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="mt-12 flex w-10/12 gap-8">
        <div className="basis-2/3">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="for-you" className="gap-2">
                <SparklesIcon className="h-4 w-4" />
                For You
              </TabsTrigger>
              <TabsTrigger value="featured" className="gap-2">
                <UsersIcon className="h-4 w-4" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="following" className="gap-2">
                <BookmarkIcon className="h-4 w-4" />
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <div className="space-y-4">
                {!!pins &&
                  pins.rows.map((pin: any) => (
                    <PostCard
                      key={pin.id}
                      title={pin.metadata.keyvalues.title}
                      excerpt={pin.metadata.keyvalues.excerpt || ""}
                      image={""}
                      date={pin.date_pinned}
                      author={{
                        name: pin.metadata.keyvalues.authorName,
                        avatar: pin.metadata.keyvalues.authorPfp,
                        username: pin.metadata.keyvalues.authorFid,
                      }}
                      href={`/post/${pin.ipfs_pin_hash}`}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="featured">featured</TabsContent>
            <TabsContent value="following">following</TabsContent>
          </Tabs>
        </div>
        <div className="flex basis-1/3 flex-col gap-4">
          <Sidebar />
        </div>
      </section>
    </main>
  );
}
