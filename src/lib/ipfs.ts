import { env } from "@/env";
import type { Post } from "@/types/core";

export const pinJSONToIPFS = async (data: Post) => {
  const pin = await fetch(`${env.PINATA_API_URL}/pinning/pinJSONToIPFS`, {
    headers: {
      Authorization: `Bearer ${env.PINATA_JWT}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      pinataMetadata: {
        name: "post",
        keyvalues: {
          title: data.title,
          excerpt: data.excerpt,
          authorPfp: data.author.avatar,
          authorName: data.author.name,
          authorFid: data.author.fid,
        },
      },
      pinataContent: JSON.stringify(data),
    }),
  });

  return pin.json();
};

export const retrievePostFromIPFS = async (cid: string) => {
  const post = await fetch(`${env.PINATA_GATEWAY_URL}/ipfs/${cid}`, {
    method: "GET",
    headers: {
      "x-pinata-gateway-token": env.PINATA_GATEWAY_KEY,
    },
  });

  return post.json();
};

export const listPinned = async () => {
  const pins = await fetch(`${env.PINATA_API_URL}/data/pinList`, {
    headers: {
      Authorization: `Bearer ${env.PINATA_JWT}`,
    },
  });

  return pins.json();
};

export const unpinFromIPFS = async (cid: string, userFid: string) => {
  // Check if pinned post belongs to user
  const pins: any[] = await listPinned();
  const pinnedPost = pins?.find((pin: any) => pin.cid === cid);

  if (!pinnedPost) {
    throw new Error("Post not found");
  }

  if (pinnedPost.userFid !== userFid) {
    throw new Error("You do not own this post");
  }

  const unpin = await fetch(`${env.PINATA_API_URL}/pinning/unpin/${cid}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.PINATA_JWT}`,
    },
  });

  return unpin.json();
};
