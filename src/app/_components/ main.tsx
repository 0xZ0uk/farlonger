"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useProfile } from "@farcaster/auth-kit";

interface Props {
  forYou: PinataPin[];
}

export default function Main({ forYou }: Props) {
  const { profile } = useProfile();

  return (
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
        <Posts posts={forYou ?? []} />
      </TabsContent>
      <TabsContent value="following"></TabsContent>
      <TabsContent value="featured"></TabsContent>
    </Tabs>
  );
}
