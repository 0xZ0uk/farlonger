import { env } from "@/env";
import { FleekSdk, PersonalAccessTokenService } from "@fleek-platform/sdk";

const personalAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: env.FLEEK_TOKEN,
  projectId: env.FLEEK_PROJECT_ID, // Optional
});

export const server = new FleekSdk({
  accessTokenService: personalAccessTokenService,
  projectId: env.FLEEK_PROJECT_ID,
});
