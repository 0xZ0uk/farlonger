import type { Metadata, ResolvingMetadata } from "next";
import { Reader } from "./_components/reader";
import { api } from "@/trpc/server";
import { reduceContent } from "@/lib/tiptap-helpers";

type Props = {
  params: { cid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const post = await api.post.getPostByCID({
    cid: params.cid,
  });

  // const featuredImage =
  //   post.content[0].type === "image" ? post.content[0].attrs.src : undefined;

  const title =
    post.content[0].type === "image"
      ? reduceContent(post.content[1].content)
      : reduceContent(post.content[0].content);

  const subtitle =
    post.content[0].type === "image"
      ? reduceContent(post.content[2].content).slice(0, 100).trim()
      : reduceContent(post.content[1].content).slice(0, 100).trim();

  return {
    title: `${title} — Farlonger`,
    description: subtitle,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://farlonger.xyz",
      title: `${title} — Farlonger`,
      description: subtitle,
      siteName: "Farlonger",
      images: [
        { url: "https://farlonger.xyz/og.jpg", width: 1200, height: 630 },
      ],
    },
  };
}

export default async function Cast({ params, searchParams }: Props) {
  const post = await api.post.getPostByCID({
    cid: params.cid,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 pt-28 sm:px-12 lg:px-24">
      <div className="w-full pt-8">
        <Reader post={post} />
      </div>
    </div>
  );
}
