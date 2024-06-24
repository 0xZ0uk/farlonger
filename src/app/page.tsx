"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "./_components/post-card";
import { BookmarkIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { api } from "@/trpc/react";
import React from "react";

export default function Home() {
  const { data: post } = api.ipfs.getByCID.useQuery({
    cid: "bafkreifuanonajr5cxigwokmr3jfsqorld3qkgz7bmzrhkcgqgyl7ph4ee",
  });

  React.useEffect(() => {
    console.log("post::", post);
  }, [post]);

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
                <PostCard
                  title="How to make Hashnode like Scroll Aware Toolbar using Framer Motion"
                  excerpt="Hola!Today, we will create a simple scroll-aware toolbar, like the one you see while reading a blog on Hashnode but using..."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="Farcaster"
                  excerpt="Farcaster is a social media platform that allows users to connect and share content with each other."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="How to make Hashnode like Scroll Aware Toolbar using Framer Motion"
                  excerpt="Hola!Today, we will create a simple scroll-aware toolbar, like the one you see while reading a blog on Hashnode but using..."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="Farcaster"
                  excerpt="Farcaster is a social media platform that allows users to connect and share content with each other."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="How to make Hashnode like Scroll Aware Toolbar using Framer Motion"
                  excerpt="Hola!Today, we will create a simple scroll-aware toolbar, like the one you see while reading a blog on Hashnode but using..."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="Farcaster"
                  excerpt="Farcaster is a social media platform that allows users to connect and share content with each other."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="How to make Hashnode like Scroll Aware Toolbar using Framer Motion"
                  excerpt="Hola!Today, we will create a simple scroll-aware toolbar, like the one you see while reading a blog on Hashnode but using..."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
                <PostCard
                  title="Farcaster"
                  excerpt="Farcaster is a social media platform that allows users to connect and share content with each other."
                  image="/assets/image.png"
                  date="20 days ago"
                  author={{
                    name: "Pedro Santana",
                    avatar: "/assets/avatar.png",
                    username: "pedrsntana.dev",
                  }}
                  href="/"
                />
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
