import { env } from "@/env";

export const getCastsByFID = async (fid: string) => {
  const casts = await fetch(
    `${env.FARCASTER_HUB_URL}/v1/castsByFid?fid=${fid}`,
  );

  return casts;
};
