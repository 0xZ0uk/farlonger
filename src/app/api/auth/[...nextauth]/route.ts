import NextAuth from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { env } from "@/env";

const handler = (req: Request, res: Response) => {
  return NextAuth(req as any, res as any, {
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
    providers: [
      CredentialsProvider({
        name: "Sign in with Farcaster",
        credentials: {
          message: {
            label: "Message",
            type: "text",
            placeholder: "0x0",
          },
          signature: {
            label: "Signature",
            type: "text",
            placeholder: "0x0",
          },
          name: {
            label: "Name",
            type: "text",
            placeholder: "0x0",
          },
          pfp: {
            label: "Pfp",
            type: "text",
            placeholder: "0x0",
          },
        },
        async authorize(credentials, req) {
          const appClient = createAppClient({
            ethereum: viemConnector(),
            relay: env.NEXT_PUBLIC_FARCASTER_RELAY_URL,
          });

          const { csrfToken } = req.body as any;

          console.log("req::", credentials, csrfToken);

          const verifyResponse = await appClient.verifySignInMessage({
            message: credentials?.message!,
            signature: credentials?.signature as `0x${string}`,
            domain: env.NEXT_PUBLIC_API_URL,
            nonce: csrfToken ?? "some-random-nonce",
          });

          const { isError, fid, error } = verifyResponse;

          if (!!isError) {
            throw new Error(error?.message);
          }

          return {
            id: fid.toString(),
            name: credentials?.name,
            image: credentials?.pfp,
          };
        },
      }),
    ],
  });
};

export { handler as GET, handler as POST };
