import { ipfsRouter } from "@/server/api/routers/ipfs";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { farcasterRouter } from "./routers/farcaster";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ipfs: ipfsRouter,
  farcaster: farcasterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
