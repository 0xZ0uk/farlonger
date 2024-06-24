import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getCastsByFID } from "@/lib/farcaster";

export const farcasterRouter = createTRPCRouter({
  getCastsByFID: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ input }) => {
      const casts = await getCastsByFID(input.fid);
      return casts;
    }),
});
