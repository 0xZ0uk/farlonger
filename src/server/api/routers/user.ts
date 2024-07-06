import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserByFID: publicProcedure
    .input(z.object({ fid: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.fc.getUserByFid(input.fid);

      return user;
    }),
  getFollowing: publicProcedure
    .input(z.object({ fid: z.number() }))
    .query(async ({ input, ctx }) => {
      return input.fid;
    }),
});
