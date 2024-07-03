import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { server } from "@/lib/fleek/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string(), body: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const list = await server.storage().list();

      return list;
    }),
});
