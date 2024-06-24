import { z } from "zod";
import {
  storePostOnIPFS,
  retrievePostFromIPFS,
  retrievePostsFromDirIPFS,
} from "@/lib/helia";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ipfsRouter = createTRPCRouter({
  store: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { fileCid } = await storePostOnIPFS(input.content);
      return { cid: fileCid.toString() };
    }),
  getByCID: publicProcedure
    .input(z.object({ cid: z.string().min(1) }))
    .query(async ({ input }) => {
      const post = await retrievePostFromIPFS(input.cid);
      return post;
    }),
  getAllByDirCID: publicProcedure
    .input(z.object({ dirCid: z.string().min(1) }))
    .query(async ({ input }) => {
      const posts = await retrievePostsFromDirIPFS(input.dirCid);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return posts as unknown[];
    }),
});
