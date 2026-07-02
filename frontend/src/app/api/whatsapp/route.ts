import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, price, unit, change, category, source } = await req.json();

  const changeText = change > 0
    ? "📈 +" + Math.abs(change) + "% (Rising)"
    : change < 0
    ? "📉 -" + Math.abs(change) + "% (Falling)"
    : "➡️ Stable";

  const message = `🛒 *PricePulse India — Price Alert*

📦 *Product:* ${name}
💰 *Current Price:* ₹${Number(price).toLocaleString("en-IN")} / ${unit}
📊 *Category:* ${category}
${changeText}
🏪 *Source:* ${source}

🤖 _AI-powered price data from PricePulse India_
🔗 Check more prices: https://pricepulse.vercel.app`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = "https://wa.me/?text=" + encoded;

  return NextResponse.json({ url: whatsappUrl, message });
}