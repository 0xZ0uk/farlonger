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
          authorPfp: data.author.avatar,
          authorName: data.author.name,
          authorFid: data.author.fid,
        },
      },
      pinataContent: data.content,
    }),
  });

  return pin.json();
};
