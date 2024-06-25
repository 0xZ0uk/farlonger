import { env } from "@/env";
import type { Cast } from "@/types/farcaster";

export const getCastsByFID = async (fid: string) => {
  const casts = await fetch(
    `${env.PINATA_API_URL}/v3/farcaster/casts?fid=${fid}`,
    { headers: { Authorization: `Bearer ${env.PINATA_JWT}` } },
  );

  return casts.json();
};

export const sendCast = async (cast: Cast) => {
  const casts = await fetch(`${env.PINATA_API_URL}/v3/farcaster/casts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.PINATA_JWT}` },
    body: JSON.stringify(cast),
  });

  return casts.json();
};
