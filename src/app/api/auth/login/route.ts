// src/pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createAuthLink } from "@/server/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url, channelToken } = await createAuthLink();
    res.status(200).json({ url, channelToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: (error as any).message || "Something went wrong" });
  }
};
