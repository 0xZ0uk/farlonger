"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";
import { useProfile } from "@farcaster/auth-kit";
import { fetcher } from "@/lib/swr";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { PostSkeleton } from "@/components/skeletons/post-skeleton";

interface Props {
  forYou: PinataPin[];
  loading?: boolean;
}

export default function Feed({ forYou, loading }: Props) {
  const { profile } = useProfile();

  // const [followedPosts, setFollowedPosts] = useState<any[]>([]);

  // const {
  //   data: following,
  //   error,
  //   isLoading,
  // } = useSWR(`/api/hub/following?fid=${profile?.fid}`, fetcher);

  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:w-1/3">
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="following" disabled>
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recent" className="w-full pb-28 pt-4">
        <Posts posts={forYou ?? []} loading={loading ?? false} />
      </TabsContent>
      <TabsContent value="featured">
        <Posts posts={forYou ?? []} loading={loading ?? false} />
      </TabsContent>
      <TabsContent value="following">
        <Posts posts={forYou ?? []} loading={loading ?? false} />
      </TabsContent>
    </Tabs>
  );
}
