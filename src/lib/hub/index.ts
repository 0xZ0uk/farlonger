import { env } from "@/env";
import {
  getInsecureHubRpcClient,
  getSSLHubRpcClient,
  type HubRpcClient,
} from "@farcaster/hub-nodejs";

const globalForFarcaster = global as unknown as {
  hubClient: HubRpcClient | undefined;
};

export const hubClient =
  globalForFarcaster.hubClient ??
  (env.FC_HUB_USE_TLS && env.FC_HUB_USE_TLS !== "false"
    ? getSSLHubRpcClient(env.FC_HUB_URL)
    : getInsecureHubRpcClient(env.FC_HUB_URL));

if (env.NODE_ENV !== "production") globalForFarcaster.hubClient = hubClient;
