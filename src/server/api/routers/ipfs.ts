/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { Post } from "@/types/core";
import {
  listPinned,
  pinJSONToIPFS,
  retrievePostFromIPFS,
  unpinFromIPFS,
} from "@/lib/ipfs";

export const ipfsRouter = createTRPCRouter({
  pin: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.any(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const pin = await pinJSONToIPFS({
        author: {
          name: ctx.session.user.name ?? "",
          avatar: ctx.session.user.image ?? "",
          fid: ctx.session.user.id,
        },
        content: input.content,
        excerpt: input.excerpt,
        title: input.title,
      });
      return { cid: pin.IpfsHash };
    }),
  unpin: protectedProcedure
    .input(z.object({ cid: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      await unpinFromIPFS(input.cid, ctx.session.user.id);
      return { success: true };
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

      const postsByFid = pins?.rows.filter(
        (pin: any) => pin.metadata.keyvalues.authorFid === input.fid,
      );

      if (!postsByFid || postsByFid.length === 0) {
        throw new Error("Posts not found");
      }

      return postsByFid;
    }),
  getUserPosts: protectedProcedure.query(async ({ ctx }) => {
    const pins = await listPinned();

    const postsByFid = pins?.rows.filter(
      (pin: any) => pin.metadata.keyvalues.authorFid === ctx.session.user.id,
    );

    if (!postsByFid || postsByFid.length === 0) {
      throw new Error("Posts not found");
    }

    return postsByFid;
  }),
  getAllPinned: publicProcedure.query(async () => {
    const pins = await listPinned();
    return pins;
  }),
});
