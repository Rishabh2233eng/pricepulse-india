import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Scrape fuel prices from IOCL
async function getFuelPrice(product: string) {
  try {
    const res = await axios.get("https://iocl.com/PetrolDieselPrices", {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 5000,
    });
    const $ = cheerio.load(res.data);
    const prices: any[] = [];

    $("table tr").each((_, row) => {
      const cols = $(row).find("td");
      if (cols.length >= 2) {
        const city = $(cols[0]).text().trim();
        const price = $(cols[1]).text().trim();
        if (city && price && price.includes(".")) {
          prices.push({ name: `${product} - ${city}`, price, unit: "litre", source: "IOCL", category: "Fuel" });
        }
      }
    });
    return prices.slice(0, 6);
  } catch {
    return [];
  }
}

// Mock data fallback for demo
function getMockPrices(query: string) {
  const data: Record<string, any[]> = {
    petrol: [
      { name: "Petrol - Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
      { name: "Petrol - Mumbai", price: "103.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
      { name: "Petrol - Bangalore", price: "102.86", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
    ],
    diesel: [
      { name: "Diesel - Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
      { name: "Diesel - Mumbai", price: "89.97", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
      { name: "Diesel - Bangalore", price: "88.94", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
    ],
    tomato: [
      { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable" },
      { name: "Tomato (Premium)", price: "55", unit: "kg", change: -8, source: "Agmarknet", category: "Vegetable" },
    ],
    onion: [
      { name: "Onion", price: "28", unit: "kg", change: -5, source: "Agmarknet", category: "Vegetable" },
      { name: "Onion (Large)", price: "35", unit: "kg", change: -3, source: "Agmarknet", category: "Vegetable" },
    ],
    gold: [
      { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity" },
      { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity" },
    ],
    silver: [
      { name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity" },
    ],
  };

  const key = Object.keys(data).find((k) => query.toLowerCase().includes(k));
  return key ? data[key] : [
    { name: query, price: "N/A", unit: "unit", change: 0, source: "No data found", category: "Unknown" },
  ];
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  // Try live scrape first, fallback to mock
  let prices: any[] = [];
  if (query.toLowerCase().includes("petrol") || query.toLowerCase().includes("diesel")) {
    prices = await getFuelPrice(query);
  }

  if (prices.length === 0) {
    prices = getMockPrices(query);
  }

  return NextResponse.json({ query, prices, timestamp: new Date().toISOString() });
}