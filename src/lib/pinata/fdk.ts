import { PinataFDK } from "pinata-fdk";

import { env } from "@/env";

export const fdk = new PinataFDK({
  pinata_jwt: env.PINATA_JWT_KEY,
  pinata_gateway: env.PINATA_GATEWAY, // gateway can be blank in this instance
  app_fid: env.APP_FID,
  app_mnemonic: env.APP_MNEMONIC,
});
