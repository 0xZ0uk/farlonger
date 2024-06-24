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
        <h1>Draft {params.id}</h1>
      </section>
    </main>
  );
}
