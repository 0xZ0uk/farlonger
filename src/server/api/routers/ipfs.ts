/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod";
import { storePostOnIPFS, retrievePostFromIPFS } from "@/lib/helia";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Post } from "@/types/core";

export const ipfsRouter = createTRPCRouter({
  store: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.any(),
        author: z.object({
          fid: z.number(),
          name: z.string().min(1),
          avatar: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const { fileCid } = await storePostOnIPFS(input as Post);
      return { cid: fileCid.toString() };
    }),
  getByCID: publicProcedure
    .input(z.object({ cid: z.string().min(1) }))
    .query(async ({ input }) => {
      const post = await retrievePostFromIPFS(input.cid);
      return post;
    }),
});
