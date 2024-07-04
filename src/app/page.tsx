import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/server";
import { mainMetadata } from "@/components/metadata";
import Main from "./_components/ main";

export const metadata = mainMetadata;

export default async function Home() {
  const posts = await api.post.getLatest();

  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] items-start justify-between p-8 pt-28 sm:px-12 lg:px-24">
      <div className="absolute left-8 flex w-[calc(100%-4rem)] flex-col items-center justify-center gap-4 sm:left-12 md:w-[calc(100%-24rem-7rem)] lg:left-24 lg:w-[calc(100%-24rem-13rem)]">
        <Main posts={posts} />
      </div>
      <Sidebar />
    </main>
  );
}
