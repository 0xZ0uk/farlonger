import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserByFID: publicProcedure
    .input(z.object({ fid: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.fc.getUserByFid(input.fid);

      return user;
    }),
  // getFollowingByFID: publicProcedure
  //   .input(z.object({ fid: z.number() }))
  //   .query(async ({ input, ctx }) => {
  //     try {
  //       const res = await ctx.hub.getLinksByFid({
  //         fid: input.fid,
  //         linkType: "follow",
  //       });

  //       return res.map((link) => link.messages.map((msg) => msg.data));
  //     } catch (e) {
  //       console.log(e);
  //       return [e];
  //     }
  //   }),
  getAuthedUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.fc.getUserByFid(parseInt(ctx.session.user.id));
    return user;
  }),
  // getAuthedFollowing: protectedProcedure.query(async ({ ctx }) => {
  //   try {
  //     const res = await ctx.hub.getLinksByFid({
  //       fid: parseInt(ctx.session.user.id),
  //       linkType: "follow",
  //     });

  //     return res.map((link) => link.messages.map((msg) => msg.data));
  //   } catch (e) {
  //     console.log(e);
  //     return [e];
  //   }
  // }),
});
