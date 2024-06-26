import type { Metadata, ResolvingMetadata } from "next";

import Post from "./_components/post";
import { api } from "@/trpc/server";

type Props = {
  params: { cid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PostPage({ params, searchParams }: Props) {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Post cid={params.cid} />
    </main>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.cid;

  // fetch data
  const post = await api.ipfs?.getByCID({
    cid: id,
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: post.title,
    description: post.excerpt
      .slice(0, 100)
      .concat(post.excerpt > 100 ? "..." : ""),
    openGraph: {
      images: [
        "/api/og?title=" +
          post.title +
          "&description=" +
          post.excerpt.slice(0, 100).concat(post.excerpt > 100 ? "..." : "") +
          "&pfp=" +
          post.author.avatar +
          "&name=" +
          post.author.name +
          "&username=" +
          post.author.fid,
        ...previousImages,
      ],
    },
  };
}

export async function generateStaticParams() {
  return [
    {
      cid: "bagaaieramioxlmj245b545eo3sbadnc6mvk6zmbcyjva7uxjzwmsbvdkwckq",
    },
  ];
}
