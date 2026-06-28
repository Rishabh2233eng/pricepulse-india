import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { product, pricePaid, unit } = await req.json();

  const prompt = `You are an Indian market price expert. A user paid ₹${pricePaid} per ${unit} for ${product}.

Respond ONLY in this exact JSON format (no markdown, no explanation):
{
  "marketPrice": <number - current fair market price in rupees>,
  "verdict": "fair" or "overcharged" or "great deal",
  "percentageDiff": <number - how much above or below market price>,
  "message": "one sentence verdict in simple Hindi-English mix that Indians use daily",
  "tip": "one practical tip for buying this cheaper next time in India",
  "sources": ["source1", "source2"]
}`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
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