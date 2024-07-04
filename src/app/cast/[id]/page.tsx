import { Metadata, ResolvingMetadata } from "next";
import { Reader } from "./_components/reader";
import { api } from "@/trpc/server";
import { reduceContent } from "@/lib/tiptap-helpers";

type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

export default async function Cast({ params, searchParams }: Props) {
  const post = await api.post.getPostByCID({
    cid: params.id,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 pt-28 sm:px-12 lg:px-24">
      <div className="w-full pt-8">
        <Reader post={post} />
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  // fetch data
  const post = await api.post.getPostByCID({
    cid: id,
  });

  const previousImages = (await parent).openGraph?.images ?? [];

  const image =
    post.content![0]?.type === "image" && post.content![0]?.attrs.src;

  const title =
    (post.content![0]?.type === "heading"
      ? reduceContent(post.content![0].content)
      : reduceContent(post.content![1]?.content)) ?? "";

  const subtitle =
    post.content![0]?.type === "heading"
      ? reduceContent(post.content![1]?.content).slice(0, 150).trim()
      : reduceContent(post.content![2]?.content).slice(0, 150).trim();

  return {
    title: `${title} | Farlonger`,
    description: subtitle,
    openGraph: {
      title: `${title} | Farlonger`,
      description: subtitle,
      images: [
        {
          url: `https://www.farlonger.xyz/api/og?title=${title}&description=${subtitle}`,
          width: 1200,
          height: 630,
        },
        ...previousImages,
      ],
    },
  };
}
