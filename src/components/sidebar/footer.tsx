"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = ({}) => {
  return (
    <div className="h-fit w-full rounded-lg border bg-muted p-6">
      <div className="flex w-full basis-1/3 items-center gap-2">
        <Image src="/farlonger.svg" alt="Farlonger" width={30} height={30} />
        <p className="text-xl font-bold">Farlonger</p>
      </div>
      <div className="mt-4 space-y-2">
        <ul className="grid list-disc grid-cols-2 gap-2">
          <FooterListItem>
            <Link href="/blog" target="_blank" rel="noreferrer">
              Official Blog
            </Link>
          </FooterListItem>
          <FooterListItem>
            <a
              href="https://warpcast.com/farlonger"
              target="_blank"
              rel="noreferrer"
            >
              Farcaster
            </a>
          </FooterListItem>
          <FooterListItem>
            <Link href="/press-kit" target="_blank" rel="noreferrer">
              Press Kit
            </Link>
          </FooterListItem>
        </ul>
      </div>
    </div>
  );
};

const FooterListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex list-disc items-center gap-2">
      <span className="text-sm">{children}</span>
    </li>
  );
};
