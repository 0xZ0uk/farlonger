import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { getFollowing, getUserByFID } from "@/lib/farcaster";
import { env } from "@/env";
import { PinataPinListResponse } from "@pinata/sdk";

export const userRouter = createTRPCRouter({
  getUserByFID: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserByFID(input.fid);

      return user;
    }),
  getFollowing: protectedProcedure
    .input(z.object({ fid: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await getFollowing(input.fid);
      const following = res.result.users.map((user: any) => user.fid);

      const followingPosts: PinataPinListResponse[] = following.map(
        async (fid: number) => {
          const posts = await ctx.pinata.pinList({
            metadata: {
              keyvalues: {
                fid: {
                  value: fid,
                  op: "eq",
                },
              },
            },
            pageLimit: 1,
          });

          return posts;
        },
      );

      const followingPostsFlat = await Promise.all(
        followingPosts.map((res) => res),
      );

      return followingPostsFlat;
    }),
});
