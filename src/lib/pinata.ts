import { env } from "@/env";
import pinataSDK from "@pinata/sdk";

export const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT_KEY });
