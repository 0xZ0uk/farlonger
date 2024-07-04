import type { Metadata } from "next";

export const mainMetadata: Metadata = {
  title: "Farlonger",
  description:
    "A sufficiently decentralized blogging platform built on Farcaster and IPFS.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farlonger.xyz",
    title: "Farlonger",
    description:
      "A sufficiently decentralized blogging platform built on Farcaster and IPFS.",
    siteName: "Farlonger",
    images: [
      {
        url: "https://farlonger.xyz/og.jpg",
        width: 1200,
        height: 630,
        alt: "Farlonger",
      },
    ],
  },
};
