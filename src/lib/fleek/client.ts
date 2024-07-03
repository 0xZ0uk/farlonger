import { FleekSdk, ApplicationAccessTokenService } from "@fleek-platform/sdk";

import { env } from "@/env";

const applicationService = new ApplicationAccessTokenService({
  clientId: env.NEXT_PUBLIC_FLEEK_CLIENT_ID,
});

export const client = new FleekSdk({
  accessTokenService: applicationService,
});
