import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const prompt = `You are a helpful Indian market price assistant. 
A user searched for: "${query}"

Respond with a JSON object only (no markdown, no explanation) in this exact format:
{
  "interpreted": "what the user is looking for in simple words",
  "category": "one of: Vegetable, Fuel, Commodity, Smartphone, Laptop, Bike, Car, Grocery, Unknown",
  "searchTerm": "best single keyword to search in our database",
  "priceRange": "estimated price range in Indian Rupees like ₹500 - ₹800",
  "insight": "one helpful sentence about current market trend for this product in India",
  "suggestion": "one buying tip for Indian consumers"
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({ success: true, result: parsed });
  } catch {
    return NextResponse.json({ success: false, result: null });
  }
}