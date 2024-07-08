"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";
import { useProfile } from "@farcaster/auth-kit";
import { fetcher } from "@/lib/swr";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface Props {
  forYou: PinataPin[];
}

export default function Feed({ forYou }: Props) {
  const { profile } = useProfile();
  const [followedPosts, setFollowedPosts] = useState<any[]>([]);

  const {
    data: following,
    error,
    isLoading,
  } = useSWR(`/api/hub/following?fid=${profile?.fid}`, fetcher);

  useEffect(() => {
    console.log(forYou);
  }, [forYou]);

  return (
    <Tabs defaultValue="for-you" className="w-full">
      <TabsList className="grid w-1/3 grid-cols-3">
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="following" disabled={!profile?.fid}>
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recent" className="w-full pb-28 pt-4">
        <Posts posts={forYou ?? []} />
      </TabsContent>
      <TabsContent value="featured">
        <Posts posts={forYou ?? []} />
      </TabsContent>
      <TabsContent value="following">
        <Posts posts={forYou ?? []} />
      </TabsContent>
    </Tabs>
  );
}
