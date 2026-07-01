import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q") || "";
  const query = rawQuery.trim();

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    // Call our Python scraper service
    const res = await fetch(
      "http://localhost:8000/search?q=" + encodeURIComponent(query),
      { next: { revalidate: 21600 } } // cache 6 hours
    );

    if (!res.ok) {
      throw new Error("Scraper service returned " + res.status);
    }

    const data = await res.json();

    if (!data.prices || data.prices.length === 0) {
      return NextResponse.json({
        query: rawQuery,
        prices: [{
          name: rawQuery,
          price: "0",
          unit: "unit",
          change: 0,
          source: "Not found",
          category: "Unknown",
          description: "No data found. Try searching: 'mango', 'iphone 15', 'royal enfield', 'tata nexon', 'gold', 'petrol delhi'"
        }],
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      query: rawQuery,
      prices: data.prices,
      source: data.source,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    console.error("Scraper error:", err);
    return NextResponse.json({
      query: rawQuery,
      prices: [{
        name: rawQuery,
        price: "0",
        unit: "unit",
        change: 0,
        source: "Service offline",
        category: "Unknown",
        description: "Price service is starting up. Please try again in a moment."
      }],
      timestamp: new Date().toISOString(),
    });
  }
}