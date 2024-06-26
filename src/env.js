import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    PINATA_GATEWAY_URL: z.string().url(),
    PINATA_GATEWAY_KEY: z.string(),
    PINATA_API_URL: z.string().url(),
    PINATA_API_KEY: z.string(),
    PINATA_API_SECRET: z.string(),
    PINATA_JWT: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_FARCASTER_RPC_URL: z.string().url(),
    NEXT_PUBLIC_FARCASTER_RELAY_URL: z.string().url(),
    NEXT_PUBLIC_FARCASTER_DOMAIN: z.string(),
    NEXT_PUBLIC_FARCASTER_SIWE_URI: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
    PINATA_GATEWAY_KEY: process.env.PINATA_GATEWAY_KEY,
    PINATA_API_URL: process.env.PINATA_API_URL,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
    PINATA_JWT: process.env.PINATA_JWT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FARCASTER_RPC_URL: process.env.NEXT_PUBLIC_FARCASTER_RPC_URL,
    NEXT_PUBLIC_FARCASTER_RELAY_URL:
      process.env.NEXT_PUBLIC_FARCASTER_RELAY_URL,
    NEXT_PUBLIC_FARCASTER_DOMAIN: process.env.NEXT_PUBLIC_FARCASTER_DOMAIN,
    NEXT_PUBLIC_FARCASTER_SIWE_URI: process.env.NEXT_PUBLIC_FARCASTER_SIWE_URI,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
