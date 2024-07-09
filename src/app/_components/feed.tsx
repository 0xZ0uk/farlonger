"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";

interface Props {
  recent: PinataPin[];
  featured: PinataPin[];
  loading?: boolean;
}

export default function Feed({ recent, featured, loading }: Props) {
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
        <Posts posts={recent ?? []} loading={loading} />
      </TabsContent>
      <TabsContent value="featured" className="w-full pb-28 pt-4">
        <Posts posts={featured ?? []} loading={loading} />
      </TabsContent>
      <TabsContent value="following" className="w-full pb-28 pt-4">
        <Posts posts={[]} loading={loading} />
      </TabsContent>
    </Tabs>
  );
}
