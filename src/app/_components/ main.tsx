"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";

interface Props {
  forYou: PinataPin[];
}

export default function Main({ forYou }: Props) {
  return (
    <Tabs defaultValue="for-you" className="w-full">
      <TabsList className="grid w-1/3 grid-cols-3">
        <TabsTrigger value="for-you">For You</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="following" disabled>
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value="for-you" className="w-full pb-28 pt-4">
        <Posts posts={forYou ?? []} />
      </TabsContent>
      <TabsContent value="featured"></TabsContent>
      <TabsContent value="following"></TabsContent>
    </Tabs>
  );
}
