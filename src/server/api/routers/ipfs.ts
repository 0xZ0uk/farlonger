/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { Post } from "@/types/core";
import { listPinned, pinJSONToIPFS, retrievePostFromIPFS } from "@/lib/ipfs";

export const ipfsRouter = createTRPCRouter({
  store: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.any(),
        author: z.object({
          fid: z.number(),
          name: z.string().min(1),
          avatar: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const pin = await pinJSONToIPFS(input as Post);
      return { cid: pin.IpfsHash };
    }),
  getByCID: publicProcedure
    .input(z.object({ cid: z.string().min(1) }))
    .query(async ({ input }) => {
      const post = await retrievePostFromIPFS(input.cid);
      return JSON.parse(post);
    }),
  getByFID: publicProcedure
    .input(z.object({ fid: z.number() }))
    .query(async ({ input }) => {
      const pins = await listPinned();
      const pinnedPost = pins.find(
        (pin: any) => pin.metadata.keyvalues.authorFid === input.fid,
      );

      if (!pinnedPost) {
        throw new Error("Post not found");
      }

      const post = await retrievePostFromIPFS(pinnedPost.cid);
      return JSON.parse(post);
    }),
  getAllPinned: publicProcedure.query(async () => {
    const pins = await listPinned();
    return pins;
  }),
});
