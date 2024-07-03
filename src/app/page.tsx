"use client";

import { Sidebar } from "@/components/sidebar";
import { Posts } from "./_components/posts";

const posts = [
  {
    id: "1",
    channel: "dev",
    title: "Building Farlonger: A Decentralized Blogging Platform on Farcaster",
    subtitle:
      "Farlonger is a blogging platform built on Farcaster and IPFS. It allows users to create and publish blog posts, comments, and reactions. The platform is designed to be decentralized, secure, and user-friendly.",
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likeCount: 10,
    commentCount: 5,
  },
  {
    id: "2",
    channel: "dev",
    title: "Building Farlonger: A Decentralized Blogging Platform on Farcaster",
    subtitle:
      "Farlonger is a blogging platform built on Farcaster and IPFS. It allows users to create and publish blog posts, comments, and reactions. The platform is designed to be decentralized, secure, and user-friendly.",
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likeCount: 10,
    commentCount: 5,
  },
  {
    id: "3",
    channel: "dev",
    title: "Building Farlonger: A Decentralized Blogging Platform on Farcaster",
    subtitle:
      "Farlonger is a blogging platform built on Farcaster and IPFS. It allows users to create and publish blog posts, comments, and reactions. The platform is designed to be decentralized, secure, and user-friendly.",
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likeCount: 10,
    commentCount: 5,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] items-start justify-between p-8 pt-28 sm:px-12 lg:px-24">
      <div className="absolute left-8 flex w-[calc(100%-4rem)] flex-col items-center justify-center gap-4 sm:left-12 md:w-[calc(100%-24rem-7rem)] lg:left-24 lg:w-[calc(100%-24rem-13rem)]">
        <Posts
          posts={posts}
          onBookmark={() => {
            console.log("bookmark");
          }}
          onRecast={() => {
            console.log("recast");
          }}
          onLike={() => {
            console.log("like");
          }}
          onComment={() => {
            console.log("comment");
          }}
        />
      </div>
      <Sidebar />
    </main>
  );
}
