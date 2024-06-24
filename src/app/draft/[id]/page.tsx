import { TitleInput } from "./_components/title-input";

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
      <section className="mt-12 flex w-10/12">
        <TitleInput />
      </section>
    </main>
  );
}
