import { Metadata, ResolvingMetadata } from "next";
import { Reader } from "./_components/reader";
import { api } from "@/trpc/server";
import { reduceContent } from "@/lib/tiptap-helpers";

type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

export default async function Cast({ params }: Props) {
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

  const image =
    post.content![0]?.type === "image" && post.content![0]?.attrs.src;

  const title =
    (post.content![0]?.type === "heading"
      ? reduceContent(post.content![0].content)
      : reduceContent(post.content![1]?.content)) ?? "";

  const subtitle =
    post.content![0]?.type === "heading"
      ? reduceContent(post.content![1]?.content)
      : reduceContent(post.content![2]?.content);

  return {
    title: `${reduceContent(post.content[1].content)} | Farlonger`,
    openGraph: {
      images: [`/api/og?title=${title}&description=${subtitle}`],
    },
  };
}

export async function generateStaticParams({ params }: Props) {
  return [
    {
      cid: params.id,
    },
  ];
}
