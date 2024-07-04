import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { getUserByFID } from "@/lib/farcaster";

export const userRouter = createTRPCRouter({
  getUserByFID: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserByFID(input.fid);

      return user;
    }),
});
