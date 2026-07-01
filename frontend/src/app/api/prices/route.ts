import { NextRequest, NextResponse } from "next/server";

const staticProducts: Record<string, any[]> = {
  petrol: [
    { name: "Petrol - Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Delhi." },
    { name: "Petrol - Mumbai", price: "103.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Mumbai." },
    { name: "Petrol - Bangalore", price: "102.86", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Bangalore." },
    { name: "Petrol - Chennai", price: "100.75", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Chennai." },
    { name: "Petrol - Hyderabad", price: "107.41", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Hyderabad." },
  ],
  diesel: [
    { name: "Diesel - Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL diesel price Delhi." },
    { name: "Diesel - Mumbai", price: "89.97", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL diesel price Mumbai." },
    { name: "Diesel - Bangalore", price: "90.94", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL diesel price Bangalore." },
  ],
  cng: [
    { name: "CNG - Delhi", price: "74.09", unit: "kg", change: -2, source: "IGL", category: "Fuel", description: "IGL CNG price Delhi." },
    { name: "CNG - Mumbai", price: "66.00", unit: "kg", change: -1, source: "MGL", category: "Fuel", description: "MGL CNG price Mumbai." },
  ],
  gold: [
    { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K pure gold MCX India." },
    { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity", description: "22K gold for jewellery." },
    { name: "Gold 18K", price: "5430", unit: "gram", change: 1.0, source: "MCX", category: "Commodity", description: "18K gold price India." },
  ],
  silver: [
    { name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity", description: "Silver price MCX India." },
  ],
  lpg: [
    { name: "LPG Cylinder (14.2kg)", price: "803", unit: "cylinder", change: 0, source: "IOCL", category: "Fuel", description: "Domestic LPG cylinder." },
  ],
};

function extractBudget(query: string) {
  const q = query.toLowerCase();
  const budget: { max?: number; min?: number } = {};
  const underMatch = q.match(/(?:under|below|less than|upto|up to)\s*₹?\s*(\d+)\s*(k|lakh|lac)?/);
  if (underMatch) {
    let val = parseInt(underMatch[1]);
    if (underMatch[2] === "k") val *= 1000;
    if (underMatch[2] === "lakh" || underMatch[2] === "lac") val *= 100000;
    budget.max = val;
  }
  const aboveMatch = q.match(/(?:above|over|more than|minimum)\s*₹?\s*(\d+)\s*(k|lakh|lac)?/);
  if (aboveMatch) {
    let val = parseInt(aboveMatch[1]);
    if (aboveMatch[2] === "k") val *= 1000;
    if (aboveMatch[2] === "lakh" || aboveMatch[2] === "lac") val *= 100000;
    budget.min = val;
  }
  return budget;
}

async function getAIPrices(query: string, budget: { max?: number; min?: number }) {
  const budgetText = budget.max ? " under ₹" + budget.max : budget.min ? " above ₹" + budget.min : "";

  const prompt = `You are an expert on current Indian market prices in 2025.

A user is searching for: "${query}"${budgetText}

Search your knowledge for REAL current Indian market prices for this product/item.
Return ONLY a JSON array, no markdown, no explanation:
[
  {
    "name": "exact product name with variant/model",
    "price": "number only no commas",
    "unit": "kg or litre or piece or gram or month or strip",
    "change": number between -15 and 15 (% price change last week),
    "source": "Amazon/Flipkart/Agmarknet/MCX/IOCL/Dealer/Market",
    "category": "Smartphone/Laptop/Car/Bike/Vegetable/Grocery/Fuel/Commodity/Electronics/Appliance/Medicine/Other",
    "description": "one line description"
  }
]

Rules:
- Give 3-6 results
- Prices must be realistic current Indian market prices in INR
- If budget filter given, only show items within that budget
- Sort by price ascending if budget mentioned
- For vehicles show ex-showroom Delhi price
- For groceries show per kg mandi price
- Be very specific with product names and models`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q") || "";
  const query = rawQuery.toLowerCase().trim();
  if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

  const budget = extractBudget(query);

  // Check static first for fuel/gold (these are exact official prices)
  const staticKey = Object.keys(staticProducts).find((k) => query.includes(k));
  if (staticKey && !budget.max && !budget.min) {
    return NextResponse.json({ query: rawQuery, prices: staticProducts[staticKey], source: "static", timestamp: new Date().toISOString() });
  }

  // For everything else — AI fetches real prices
  const prices = await getAIPrices(rawQuery, budget);

  if (prices.length === 0) {
    return NextResponse.json({
      query: rawQuery,
      prices: [{ name: rawQuery, price: "0", unit: "unit", change: 0, source: "Not found", category: "Unknown", description: "Could not find prices. Try a more specific search." }],
      timestamp: new Date().toISOString()
    });
  }

  return NextResponse.json({ query: rawQuery, prices, source: "ai", timestamp: new Date().toISOString() });
}