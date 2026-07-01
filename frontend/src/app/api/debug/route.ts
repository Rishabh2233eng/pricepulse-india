import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "NO API KEY FOUND" });
  }

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Return this exact JSON only: [{"name":"Mango","price":"80","unit":"kg","change":-2,"source":"Agmarknet","category":"Fruit","description":"Fresh Alphonso mango"}]' }] }],
        }),
      }
    );
    const data = await res.json();
    return NextResponse.json({ status: res.status, keyFound: key.substring(0, 8) + "...", data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}