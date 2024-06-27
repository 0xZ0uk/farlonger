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
            image={""}
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
