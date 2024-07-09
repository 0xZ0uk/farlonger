"use client";

import type { PinataPin } from "@pinata/sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Posts } from "./posts";
import { useProfile } from "@farcaster/auth-kit";

interface Props {
  recent: PinataPin[];
  featured: PinataPin[];
}

export default function Feed({ recent, featured }: Props) {
  const { profile } = useProfile();

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
<<<<<<< HEAD
        <Posts posts={recent ?? []} />
      </TabsContent>
      <TabsContent value="featured" className="w-full pb-28 pt-4">
        <Posts posts={featured ?? []} />
      </TabsContent>
      <TabsContent value="following" className="w-full pb-28 pt-4">
        <Posts posts={[]} />
=======
        <Posts posts={forYou ?? []} loading={loading ?? false} />
      </TabsContent>
      <TabsContent value="featured">
        <Posts posts={forYou ?? []} loading={loading ?? false} />
      </TabsContent>
      <TabsContent value="following">
        <Posts posts={forYou ?? []} loading={loading ?? false} />
>>>>>>> develop
      </TabsContent>
    </Tabs>
  );
}
