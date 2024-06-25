import { env } from "@/env";

export const getCastsByFID = async (fid: string) => {
  const casts = await fetch(
    `${env.PINATA_API_URL}/v3/farcaster/casts?fid=${fid}`,
    { headers: { Authorization: `Bearer ${env.PINATA_JWT}` } },
  );

  return casts.json();
};
