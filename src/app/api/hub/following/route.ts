import { env } from "@/env";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    if (req.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const fid = searchParams.get("fid");

    const response = await fetch(
      `${env.FC_HUB_HTTP}/v1/linksByFid?fid=${fid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export { handler as GET, handler as POST };
