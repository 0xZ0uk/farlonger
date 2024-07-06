import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    PINATA_GATEWAY: z.string(),
    PINATA_GATEWAY_TOKEN: z.string(),
    PINATA_JWT_KEY: z.string(),
    FARLONGER_VERSION: z.string(),
    FC_HUB_URL: z.string().url(),
    FC_HUB_USE_TLS: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
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
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    PINATA_GATEWAY_TOKEN: process.env.PINATA_GATEWAY_TOKEN,
    PINATA_JWT_KEY: process.env.PINATA_JWT_KEY,
    FARLONGER_VERSION: process.env.FARLONGER_VERSION,
    FC_HUB_URL: process.env.FC_HUB_URL,
    FC_HUB_USE_TLS: process.env.FC_HUB_USE_TLS,
    NEXT_PUBLIC_FARCASTER_DOMAIN: process.env.NEXT_PUBLIC_FARCASTER_DOMAIN,
    NEXT_PUBLIC_FARCASTER_RELAY_URL:
      process.env.NEXT_PUBLIC_FARCASTER_RELAY_URL,
    NEXT_PUBLIC_FARCASTER_RPC_URL: process.env.NEXT_PUBLIC_FARCASTER_RPC_URL,
    NEXT_PUBLIC_FARCASTER_SIWE_URI: process.env.NEXT_PUBLIC_FARCASTER_SIWE_URI,
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
