import {
  FleekSdk,
  ApplicationAccessTokenService,
  PersonalAccessTokenService,
} from "@fleek-platform/sdk";

import { env } from "@/env";

const personalAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: env.FLEEK_PAT,
  projectId: env.FLEEK_PROJECT_ID, // Optional
});

const applicationService = new ApplicationAccessTokenService({
  clientId: env.NEXT_PUBLIC_FLEEK_CLIENT_ID,
});

export const client = new FleekSdk({
  accessTokenService: applicationService,
});

export const server = new FleekSdk({
  accessTokenService: personalAccessTokenService,
});
