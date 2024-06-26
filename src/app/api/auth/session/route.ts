import { NextApiRequest, NextApiResponse } from "next";
import { getFarcasterAuthSession } from "@/server/auth";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const session = getFarcasterAuthSession(req, res);
  if (session) {
    res.status(200).json(session);
  } else {
    res.status(401).json({ error: "No active session" });
  }
};
