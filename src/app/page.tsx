import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/server";
import Feed from "./_components/feed";

export default async function Home() {
  const recent = await api.post.getLatest();
  const featured = await api.post.getByUserFID({ fid: "762749" });

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] gap-4 w-full flex-col items-start justify-between p-4 pt-28 md:flex-row md:px-12 lg:px-24">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[calc(100%-200px)]">
        <Feed recent={recent} featured={featured} />
      </div>
      <Sidebar />
    </main>
  );
}
