import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  if (!query) return NextResponse.json({ url: null });

  try {
    const searchQuery = encodeURIComponent(query + " product india");
    const res = await fetch(
      "https://duckduckgo.com/i.js?q=" + searchQuery + "&o=json&iax=images&ia=images",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://duckduckgo.com/",
        },
      }
    );
    const data = await res.json();
    const results = data?.results || [];
    const url = results[0]?.image || null;
    return NextResponse.json({ url, query });
  } catch {
    return NextResponse.json({ url: null });
  }
}