import { Metadata, ResolvingMetadata } from "next";
import { Reader } from "./_components/reader";
import { api } from "@/trpc/server";
import { reduceContent } from "@/lib/tiptap-helpers";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const post = await api.post.getPostByCID({
    cid: id,
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "A Farlonger Post",
    openGraph: {
      images: ["/og.jpg", ...previousImages],
    },
  };
}

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
