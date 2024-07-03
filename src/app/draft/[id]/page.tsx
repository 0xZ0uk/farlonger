"use client";

import { useProfile } from "@farcaster/auth-kit";
import { Editor } from "./_components/editor";
import { useRouter } from "next/navigation";

export default function Draft() {
  const { isAuthenticated } = useProfile();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/");
  }

  return <Editor />;
}
