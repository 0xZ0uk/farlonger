import { Reader } from "./_components/reader";
import { api } from "@/trpc/server";
import { mainMetadata } from "@/components/metadata";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = mainMetadata;

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
