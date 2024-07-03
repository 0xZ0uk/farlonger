/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import NextAuth from "next-auth";

import { authOptions } from "@/server/auth";

const handler = (req: Request, res: Response) => {
  return NextAuth(req as any, res as any, authOptions);
};

export { handler as GET, handler as POST };
