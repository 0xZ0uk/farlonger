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
  sendCast: publicProcedure
    .input(
      z.object({
        cast: z.object({ text: z.string().min(1) }),
        signerId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const cast = await sendCast({
        text: input.cast.text,
        signerId: input.signerId,
        parentUrl: null,
        embeds: null,
        mentions: null,
        mentionsPositions: null,
        parentCastId: null,
      });
      return cast;
    }),
  mySession: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
});
