import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";
import React from "react";
import { Posts } from "./_components/posts";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const pins = await api.ipfs.getAllPinned();
  const session = await getServerAuthSession();

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
              <TabsTrigger value="following" className="gap-2" disabled>
                <BookmarkIcon className="h-4 w-4" />
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <Posts posts={pins.rows} />
            </TabsContent>
            <TabsContent value="featured">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </TabsContent>
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
