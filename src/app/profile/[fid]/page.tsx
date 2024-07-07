"use client";

import { Posts } from "@/app/_components/posts";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/swr";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

export default function ProfileByFID({ params }: { params: { fid: string } }) {
  const { data, error, isLoading } = useSWR(
    `/api/hub/following?fid=${params.fid}`,
    fetcher,
  );

  const { data: user } = api.user.getUserByFID.useQuery({
    fid: Number(params.fid) ?? 1,
  });

  const { data: posts } = api.post.getByUserFID.useQuery({
    fid: params.fid ?? 1,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] items-start justify-between p-8 pt-28 sm:px-12 lg:px-24">
      <div className="absolute left-8 flex w-[calc(100%-4rem)] flex-col items-center justify-center gap-4 sm:left-12 md:w-[calc(100%-24rem-7rem)] lg:left-24 lg:w-[calc(100%-24rem-13rem)]">
        <div className="w-full">
          <h1 className="mb-8 text-6xl font-bold">
            {user?.username ?? "Display Name"}
          </h1>
          <Posts posts={posts ?? []} />
        </div>
      </div>
      <div className="fixed right-8 hidden min-h-[calc(100vh-9rem-1px)] flex-col gap-4 border-l  border-muted pl-4 sm:right-12 sm:hidden sm:w-0 md:flex md:w-96 lg:right-24">
        <div className="h-fit w-fit rounded-full border bg-muted">
          <Image
            src={user?.pfp ?? "https://warpcast.com/avatar.png"}
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-2xl font-bold">@{user?.username}</p>
          <div className="flex items-center gap-2">
            <Link
              className="text-sm font-semibold text-primary"
              href={`https://warpcast.com/${"farlonger"}`}
              target="_blank"
            >
              Warpcast
            </Link>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">
            {user?.bio ?? "Lorem ipsum dolar sit amet."}
          </p>
        </div>
        <Button className="w-fit">Follow</Button>
      </div>
    </main>
  );
}
