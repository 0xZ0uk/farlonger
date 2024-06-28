"use client";

import * as React from "react";
import PostCard from "./post-card";
import type { Post } from "@/types/core";

interface Props {
  posts: Post[];
}

export const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {!!posts &&
        posts.map((pin: any) => (
          <PostCard
            key={pin.id}
            title={pin.metadata.keyvalues.title}
            excerpt={pin.metadata.keyvalues.excerpt || ""}
            image={
              "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2302&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            date={pin.date_pinned}
            author={{
              fid: pin.metadata.keyvalues.authorFid,
              name: pin.metadata.keyvalues.authorName,
              avatar: pin.metadata.keyvalues.authorPfp,
              username: pin.metadata.keyvalues.authorFid,
            }}
            href={`/post/${pin.ipfs_pin_hash}`}
          />
        ))}
    </div>
  );
};
