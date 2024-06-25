import Post from "./_components/post";

export async function generateStaticParams() {
  return [
    {
      cid: "bagaaieramioxlmj245b545eo3sbadnc6mvk6zmbcyjva7uxjzwmsbvdkwckq",
    },
  ];
}

export default function PostPage({ params }: { params: { cid: string } }) {
  return (
    <div>
      <Post cid={params.cid} />
    </div>
  );
}
