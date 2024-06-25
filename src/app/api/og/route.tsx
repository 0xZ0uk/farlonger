import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const poppinsBold = await fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-800-normal.ttf",
    ).then((res) => res.arrayBuffer());

    const opensansRegular = await fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf",
    ).then((res) => res.arrayBuffer());

    // ?title=<title>
    const hasTitle = searchParams.has("title");

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    const description = searchParams.get("description");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Open Sans",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#16101E",
          }}
        >
          <div tw="flex w-full h-full flex-col items-start justify-start p-8">
            <p
              tw="text-white text-lg font-bold"
              style={{ fontFamily: "Poppins Bold" }}
            >
              <span tw="text-[#7d66c2]">Far</span>Longer
            </p>
            <h1
              style={{
                fontFamily: "Poppins Bold",
              }}
              tw="text-white py-0 text-7xl font-bold"
            >
              {title}
            </h1>
            {!!description && (
              <p tw="text-white/50 text-lg" style={{ fontFamily: "Open Sans" }}>
                {description}
              </p>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Poppins Bold",
            data: poppinsBold,
            style: "normal",
            weight: 800,
          },
          {
            name: "Open Sans",
            data: opensansRegular,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
