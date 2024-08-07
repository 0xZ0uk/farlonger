import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { PinataMetadata } from "@pinata/sdk";
import { env } from "@/env";
import { PostInputSchema } from "@/types/core";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(PostInputSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        body,
        metadata: { title, channel, subtitle, featuredImage, tags },
      } = input;

      const metadata: PinataMetadata = {
        name: title,
        // @ts-expect-error PinataMetadata type is wrong
        keyvalues: {
          channel: channel ?? "everyone",
          createdAt: new Date().toISOString(),
          fid: ctx.session.user.id,
          featuredImage,
          subtitle,
          version: env.FARLONGER_VERSION,
          tags,
          commentCount: 0,
          likeCount: 0,
        },
      };

      const pin = await ctx.ipfs.pinJSONToIPFS(body, {
        pinataMetadata: metadata,
      });

      return {
        cid: pin.IpfsHash,
      };
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.ipfs.pinList({
      pageLimit: 100,
      metadata: {
        keyvalues: {
          version: {
            value: env.FARLONGER_VERSION,
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
      const posts = await ctx.ipfs.pinList({
        metadata: {
          keyvalues: {
            fid: {
              value: input.fid,
              op: "eq",
            },
            version: {
              value: env.FARLONGER_VERSION,
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
      const posts = await ctx.ipfs.pinList({
        pageLimit: 100,
        metadata: {
          keyvalues: {
            channel: {
              value: input.channel,
              op: "eq",
            },
            version: {
              value: env.FARLONGER_VERSION,
              op: "eq",
            },
          },
        },
      });

      return posts.rows;
    }),
  getMyPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.ipfs.pinList({
      metadata: {
        keyvalues: {
          fid: {
            value: ctx.session.user.id,
            op: "eq",
          },
          version: {
            value: env.FARLONGER_VERSION,
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
    .query(async ({ input, ctx }) => {
      const res = await fetch(`${env.PINATA_GATEWAY}/${input.cid}`, {
        method: "GET",
        headers: {
          "x-pinata-gateway-token": env.PINATA_GATEWAY_TOKEN,
        },
      });

      const metadata = await ctx.ipfs.pinList({
        hashContains: input.cid,
        metadata: {
          keyvalues: {
            version: {
              value: env.FARLONGER_VERSION,
              op: "eq",
            },
          },
        },
        pageLimit: 100,
      });

      const post = await res.json();

      return { ...post, metadata: metadata.rows[0]?.metadata.keyvalues };
    }),
});
