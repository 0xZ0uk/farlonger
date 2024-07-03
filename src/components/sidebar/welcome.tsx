"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Welcome: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className={cn(
        "h-fit w-full cursor-pointer rounded-lg border transition-all",
        !open && "hidden h-0 opacity-0",
      )}
      onClick={() => setOpen(false)}
    >
      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-primary p-6 no-underline outline-none focus:shadow-md">
        <Image src="/farlonger.svg" alt="Farlonger" width={40} height={40} />
        <div className="mb-2 mt-4">
          <h3 className="text-xl font-bold text-white">
            Welcome to Farlonger!
          </h3>
        </div>
        <p className="text-sm leading-tight text-white">
          A sufficiently decentralized blogging platform built on Farcaster and
          IPFS.
        </p>
      </div>
    </div>
  );
};
