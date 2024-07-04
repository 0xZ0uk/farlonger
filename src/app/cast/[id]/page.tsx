import { Reader } from "./_components/reader";

export default async function Cast({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 pt-28 sm:px-12 lg:px-24">
      <div className="w-full pt-8">
        <Reader cid={params.id} />
      </div>
    </div>
  );
}
