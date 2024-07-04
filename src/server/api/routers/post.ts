import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { PinataMetadata } from "@pinata/sdk";
import { env } from "@/env";

const postSchema = z.object({
  title: z.string(),
  body: z.any(),
  subtitle: z.string().optional(),
  featuredImage: z.string().optional(),
  channel: z.string().optional(),
});

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, body, channel, subtitle, featuredImage } = input;

      const metadata: PinataMetadata = {
        name: "postMetadata",
        // @ts-expect-error PinataMetadata type is wrong
        keyvalues: {
          title,
          channel: channel ?? "test-dev",
          createdAt: new Date().toISOString(),
          fid: ctx.session.user.id,
          commentCount: 0,
          likeCount: 0,
          featuredImage,
          subtitle,
          version: "0.0.2",
        },
      };

      const pin = await ctx.pinata.pinJSONToIPFS(body, {
        pinataMetadata: metadata,
      });

      return {
        cid: pin.IpfsHash,
      };
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.pinata.pinList({
      pageLimit: 100,
      metadata: {
        keyvalues: {
          channel: {
            value: "test-dev",
            op: "eq",
          },
          version: {
            value: "0.0.2",
            op: "eq",
          },
        },
      },
    });

    return posts.rows;
  }),
  getByUserFID: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await ctx.pinata.pinList({
        metadata: {
          keyvalues: {
            fid: {
              value: input.fid,
              op: "eq",
            },
          },
        },
        pageLimit: 100,
      });

      return posts.rows;
    }),
  getByChannel: publicProcedure
    .input(z.object({ channel: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await ctx.pinata.pinList({
        pageLimit: 100,
        metadata: {
          keyvalues: {
            channel: {
              value: input.channel,
              op: "eq",
            },
          },
        },
      });

      return posts.rows;
    }),
  getMyPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.pinata.pinList({
      metadata: {
        keyvalues: {
          fid: {
            value: ctx.session.user.id,
            op: "eq",
          },
        },
      },
      pageLimit: 100,
    });

    return posts.rows;
  }),
  getPostByCID: publicProcedure
    .input(z.object({ cid: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(`${env.PINATA_GATEWAY}/${input.cid}`, {
        method: "GET",
        headers: {
          "x-pinata-gateway-token": env.PINATA_GATEWAY_TOKEN,
        },
      });

      const post = res.json();

      return post;
    }),
});
