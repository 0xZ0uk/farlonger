import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/server/auth";

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
