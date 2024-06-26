import { env } from "@/env";
import { appClient } from "./farcasterAuth";
import { v4 as uuidv4 } from "uuid";

const sessionStore = new Map<string, any>(); // Simulate a session store

interface Session {
  user: {
    fid: number;
    // Add other properties as needed
  };
}

export const createAuthLink = async () => {
  const nonce = uuidv4();
  const { data, isError, error } = await appClient.createChannel({
    siweUri: env.FARCASTER_OG_SIWE_URI, // Replace with your actual login URL
    domain: env.FARCASTER_OG_DOMAIN, // Replace with your actual domain
    nonce,
  });

  if (isError && error) {
    throw new Error(`Failed to create channel: ${error.message}`);
  }

  return {
    url: data.url,
    channelToken: data.channelToken,
    nonce: data.nonce,
  };
};

export const verifySignInMessage = async (
  domain: string,
  nonce: string,
  message: string,
  signature: string,
) => {
  const { data, success, fid, isError, error } =
    await appClient.verifySignInMessage({
      domain,
      nonce,
      message,
      signature: `0x${signature}`,
    });

  if (isError || !success) {
    return { success: false, error: error?.message };
  }

  const channelToken = data?.nonce; // Assume nonce as the token for session storage
  sessionStore.set(channelToken, {
    isAuthenticated: true,
    user: { fid, message },
  });
  return { success: true, user: { fid, message } };
};

export const getFarcasterAuthSession = (headers: Headers) => {
  const token = headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("farcaster-token="))
    ?.split("=")[1];
  if (token && sessionStore.has(token)) {
    return sessionStore.get(token) as Session;
  }
  return null;
};
