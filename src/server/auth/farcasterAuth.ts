import { env } from "@/env";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

const appClient = createAppClient({
  relay: env.FARCASTER_RELAY_URL,
  ethereum: viemConnector(),
});

export { appClient };
