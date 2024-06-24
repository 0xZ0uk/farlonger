import { Editor } from "./_components/editor";

export async function generateStaticParams() {
  return [
    {
      id: "1",
    },
  ];
}

export default function DraftPage({ params }: { params: { id: string } }) {
  return <Editor />;
}
