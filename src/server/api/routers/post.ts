import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string(), body: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const list = await ctx.fleek.storage().list();

      return list;
    }),
});
