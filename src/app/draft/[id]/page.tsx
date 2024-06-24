import { Editor } from "./_components/editor";

export async function generateStaticParams() {
  return [
    {
      id: "1",
    },
  ];
}

export default function DraftPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <section className="flex w-10/12 gap-12">
        <div className="h-[calc(100vh-4rem)] basis-1/4 border-r"></div>
        <div className="basis-3/4 pt-12">
          <Editor />
        </div>
      </section>
    </main>
  );
}
