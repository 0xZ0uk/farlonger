import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { getCastsByFID, sendCast } from "@/lib/farcaster";

export const farcasterRouter = createTRPCRouter({
  getCastsByFID: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ input }) => {
      const casts = await getCastsByFID(input.fid);
      return casts;
    }),
  getUserCasts: protectedProcedure.query(async ({ ctx }) => {
    const casts = await getCastsByFID(ctx.session.user.id);
    return casts;
  }),
  sendCast: protectedProcedure
    .input(
      z.object({
        cast: z.object({ text: z.string().min(1) }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const cast = await sendCast({
        text: input.cast.text,
        signerId: ctx.session.user.id,
        parentUrl: null,
        embeds: null,
        mentions: null,
        mentionsPositions: null,
        parentCastId: null,
      });
      return cast;
    }),
});
