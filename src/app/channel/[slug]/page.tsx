export default async function Cast({ params }: { params: { slug: string } }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-8 pt-28 md:px-12 lg:px-24">
      <div className="w-full pt-8">{params.slug}</div>
    </div>
  );
}
