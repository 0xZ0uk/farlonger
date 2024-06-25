"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/app/_components/post-card";
import { BookmarkIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";
import React from "react";
import { api } from "@/trpc/react";
import { useProfile } from "@farcaster/auth-kit";

export default function Home() {
  const { profile } = useProfile();

  const { data: pins } = api.ipfs.getByFID.useQuery(
    { fid: profile.fid ?? 0 },
    {
      enabled: !!profile.fid,
    },
  );

  React.useEffect(() => {
    console.log(pins);
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
              <TabsTrigger value="featured" className="gap-2" disabled>
                <UsersIcon className="h-4 w-4" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="following" className="gap-2" disabled>
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
