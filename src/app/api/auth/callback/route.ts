import { NextApiRequest, NextApiResponse } from "next";
import { verifySignInMessage } from "@/server/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { domain, nonce, message, signature } = req.body;
  const result = await verifySignInMessage(domain, nonce, message, signature);
  if (result.success) {
    res.setHeader("Set-Cookie", `farcaster-token=${nonce}; Path=/; HttpOnly`);
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: result.error });
  }
};
