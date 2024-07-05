import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-[calc(100vh-9rem-1px)] items-center justify-between p-8 pt-28 sm:px-12 lg:px-24">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-muted-foreground">
          Seems you&apos;ve going a bit too far.
        </p>
        <Link href="/">
          <Button className="gap-2">
            <HomeIcon className="h-4 w-4" />
            Go back to the Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
