import type { JSONContent } from "@tiptap/core";
import { z } from "zod";

export type Post = {
  cid: string; // IPFS CID

  metadata: {
    title: string;
    subtitle?: string;
    featuredImage?: string;
    channel?: string;

    createdAt: string; // ISO 8601 date
    updatedAt?: string; // ISO 8601 date

    id: string; // Farlonger Post ID
    createdBy: string; // Author Farcaster FID
    flVersion: string; // Farlonger Version

    commentCount: number;
    likeCount: number;
  };

  body: JSONContent; // JSONContent Body
};

export const PostInputSchema = z.object({
  metadata: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    featuredImage: z.string().optional(),
    channel: z.string().optional(),
  }),

  body: z.any(),
});
