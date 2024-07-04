import { env } from "@/env";

const PINATA_FARCASTER_API_URL = "https://api.pinata.cloud/v3/farcaster";

const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${env.PINATA_JWT_KEY}` },
};

export const getUserByFID = async (fid: string) => {
  const res = await fetch(`${PINATA_FARCASTER_API_URL}/users/${fid}`, options);
  const json = await res.json();

  return json.user;
};
