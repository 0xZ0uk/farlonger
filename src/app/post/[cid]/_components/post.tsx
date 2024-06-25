"use client";

import { api } from "@/trpc/react";
import React from "react";

interface PostProps {
  cid: string;
}

export default function Post({ cid }: PostProps) {
  const { data: post } = api.ipfs.getByCID.useQuery({
    cid,
  });

  React.useEffect(() => {
    console.log("post::", post);
  }, [post]);

  return <div>{post?.title}</div>;
}
