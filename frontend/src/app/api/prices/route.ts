import { NextRequest, NextResponse } from "next/server";

const staticProducts: Record<string, any[]> = {
  petrol: [
    { name: "Petrol - Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Delhi." },
    { name: "Petrol - Mumbai", price: "103.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Mumbai." },
    { name: "Petrol - Bangalore", price: "102.86", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Bangalore." },
    { name: "Petrol - Chennai", price: "100.75", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL petrol price Chennai." },
  ],
  diesel: [
    { name: "Diesel - Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL diesel price Delhi." },
    { name: "Diesel - Mumbai", price: "89.97", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Official IOCL diesel price Mumbai." },
  ],
  gold: [
    { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K pure gold MCX India." },
    { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity", description: "22K gold for jewellery." },
  ],
  silver: [
    { name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity", description: "Silver price MCX India." },
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

async function fetchPricesFromAI(query: string, budget: { max?: number; min?: number }) {
  const budgetText = budget.max
    ? " Budget constraint: ONLY show items under ₹" + budget.max
    : budget.min
    ? " Budget constraint: ONLY show items above ₹" + budget.min
    : "";

  const prompt = `You are a real-time Indian market price expert with knowledge of current 2024-2025 prices.

User is searching for: "${query}"${budgetText}

Your task: Return REAL current Indian market prices for this exact product/item.

IMPORTANT RULES:
- Return ONLY a valid JSON array, absolutely no markdown, no backticks, no explanation
- Prices must be REAL current Indian market prices in INR rupees
- The "price" field must be a STRING containing ONLY digits, no commas, no rupee symbol (e.g. "45000" not "45,000" or "₹45000")
- For vehicles: use ex-showroom Delhi price
- For groceries/vegetables: use per kg mandi price  
- For electronics: use current Flipkart/Amazon India price
- For medicines: use MRP
- Give 3-5 results with different variants/options
- change field: realistic % price change from last week (negative = price fell, positive = rose)

Return ONLY this JSON format:
[
  {
    "name": "specific product name with variant",
    "price": "number only as string",
    "unit": "kg or litre or piece or gram or month or strip or dozen",
    "change": -3,
    "source": "Amazon or Flipkart or Agmarknet or MCX or IOCL or Dealer or Market or MRP",
    "category": "Smartphone or Laptop or Car or Bike or Vegetable or Grocery or Fuel or Commodity or Electronics or Appliance or Medicine or Dry Fruit or Fruit or Other",
    "description": "one line description"
  }
]`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 1000 },
        }),
      }
    );

    if (!res.ok) {
      console.error("Gemini API error:", res.status);
      return [];
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean response — remove markdown if present
    let cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON array from response
    const startIdx = cleaned.indexOf("[");
    const endIdx = cleaned.lastIndexOf("]");
    if (startIdx === -1 || endIdx === -1) {
      console.error("No JSON array found in response:", cleaned);
      return [];
    }

    cleaned = cleaned.substring(startIdx, endIdx + 1);
    const parsed = JSON.parse(cleaned);

    // Validate and clean each item
    const validated = parsed
      .filter((item: any) => item.name && item.price)
      .map((item: any) => ({
        name: String(item.name),
        price: String(item.price).replace(/[^0-9.]/g, ""),
        unit: String(item.unit || "piece"),
        change: Number(item.change) || 0,
        source: String(item.source || "Market"),
        category: String(item.category || "Other"),
        description: String(item.description || ""),
      }))
      .filter((item: any) => parseFloat(item.price) > 0);

    // Apply budget filter
    let filtered = validated;
    if (budget.max) {
      filtered = filtered.filter((p: any) => parseFloat(p.price) <= budget.max!);
    }
    if (budget.min) {
      filtered = filtered.filter((p: any) => parseFloat(p.price) >= budget.min!);
    }
    if (budget.max || budget.min) {
      filtered = filtered.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    }

    return filtered;
  } catch (err) {
    console.error("Error fetching AI prices:", err);
    return [];
  }
}

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q") || "";
  const query = rawQuery.toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  const budget = extractBudget(query);

  // Use static data for fuel and gold (official prices)
  const staticKey = Object.keys(staticProducts).find((k) => query.includes(k));
  if (staticKey && !budget.max && !budget.min) {
    return NextResponse.json({
      query: rawQuery,
      prices: staticProducts[staticKey],
      source: "static",
      timestamp: new Date().toISOString(),
    });
  }

  // Use Gemini AI for everything else
  const prices = await fetchPricesFromAI(rawQuery, budget);

  if (prices.length === 0) {
    // Try once more with simplified prompt
    const fallbackPrompt = `Give me current Indian market price for "${rawQuery}" in 2025. Return ONLY a JSON array like this, no markdown:
[{"name":"${rawQuery}","price":"ACTUAL_PRICE_NUMBER","unit":"piece","change":0,"source":"Market","category":"Other","description":"Current Indian market price"}]`;

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: fallbackPrompt }] }] }),
        }
      );
      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      const clean = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
      const start = clean.indexOf("[");
      const end = clean.lastIndexOf("]");
      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(clean.substring(start, end + 1));
        const valid = parsed.filter((p: any) => p.price && parseFloat(String(p.price).replace(/[^0-9.]/g, "")) > 0)
          .map((p: any) => ({ ...p, price: String(p.price).replace(/[^0-9.]/g, "") }));
        if (valid.length > 0) {
          return NextResponse.json({ query: rawQuery, prices: valid, source: "ai-fallback", timestamp: new Date().toISOString() });
        }
      }
    } catch {}

    return NextResponse.json({
      query: rawQuery,
      prices: [{ name: rawQuery, price: "0", unit: "unit", change: 0, source: "Not found", category: "Unknown", description: "Could not find price. Please try a more specific search like 'Tata Nexon price' or 'mango price per kg'." }],
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    query: rawQuery,
    prices,
    source: "ai",
    timestamp: new Date().toISOString(),
  });
}