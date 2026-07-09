import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const results = await Promise.all(
    items.map(async (item: { name: string; quantity: number; unit: string }) => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/search?q=" + encodeURIComponent(item.name),
          { cache: "no-store" }
        );
        const data = await res.json();
        const price = data.prices?.[0];
        if (price && price.price !== "0") {
          return {
            name: item.name,
            quantity: item.quantity,
            unit: item.unit || price.unit,
            pricePerUnit: parseFloat(price.price),
            total: parseFloat(price.price) * item.quantity,
            source: price.source,
            category: price.category,
            found: true,
          };
        }
        return { name: item.name, quantity: item.quantity, unit: item.unit, pricePerUnit: 0, total: 0, source: "Not found", category: "Unknown", found: false };
      } catch {
        return { name: item.name, quantity: item.quantity, unit: item.unit, pricePerUnit: 0, total: 0, source: "Error", category: "Unknown", found: false };
      }
    })
  );

  const totalMarket = results.reduce((sum, r) => sum + r.total, 0);

  return NextResponse.json({ items: results, totalMarket, timestamp: new Date().toISOString() });
}