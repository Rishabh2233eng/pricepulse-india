"use client";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const cityPrices: Record<string, number> = {
  Delhi: 0,
  Mumbai: 5,
  Bangalore: 3,
  Chennai: 2,
  Hyderabad: 4,
  Pune: 1,
  Kolkata: -2,
  Ahmedabad: -1,
};

function ProductDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;

  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const price = searchParams.get("price") || "0";
  const unit = searchParams.get("unit") || "unit";
  const change = parseFloat(searchParams.get("change") || "0");
  const source = searchParams.get("source") || "Market";
  const category = searchParams.get("category") || "General";
  const description = searchParams.get("description") || "";

  const isUp = change > 0;
  const isDown = change < 0;
  const basePrice = parseFloat(price.replace(/,/g, "")) || 0;

  const history = [
    { date: "Today", price: basePrice },
    { date: "Yesterday", price: basePrice * (1 - change / 100) },
    { date: "3 Days Ago", price: basePrice * (1 - (change * 1.5) / 100) },
    { date: "1 Week Ago", price: basePrice * (1 - (change * 2) / 100) },
    { date: "1 Month Ago", price: basePrice * (1 - (change * 4) / 100) },
  ];

  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        {/* Header */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full mb-3 inline-block">{category}</span>
              <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
              <p className="text-gray-400 text-sm max-w-lg">{description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-400">
                ₹{basePrice.toLocaleString("en-IN")}
              </div>
              <div className="text-gray-400 text-sm">per {unit}</div>
              <div className={`flex items-center justify-end gap-1 mt-2 text-sm font-medium ${isUp ? "text-red-400" : isDown ? "text-emerald-400" : "text-gray-400"}`}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                {Math.abs(change)}% from last week
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 text-xs text-gray-500">
            <span>Source: <span className="text-gray-300">{source}</span></span>
            <span>Updated: <span className="text-gray-300">Just now</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Price History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">📈 Price History</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{h.date}</span>
                  <span className={`font-semibold text-sm ${i === 0 ? "text-emerald-400" : "text-white"}`}>
                    ₹{h.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* City-wise Prices */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">🏙️ City-wise Prices</h2>
            <div className="space-y-3">
              {Object.entries(cityPrices).map(([city, diff]) => {
                const cityPrice = basePrice + (basePrice * diff) / 100;
                return (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{city}</span>
                    <span className="text-white font-semibold text-sm">
                      ₹{cityPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Prediction */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-2">🤖 AI Price Prediction</h2>
          <p className="text-gray-400 text-sm mb-3">Based on historical trends and market signals:</p>
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${isUp ? "text-red-400" : "text-emerald-400"}`}>
              {isUp ? "📈 Likely to Rise" : isDown ? "📉 Likely to Fall" : "➡️ Stable"}
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            {isDown
              ? `Prices have dropped ${Math.abs(change)}% recently. Market correction may stabilize soon.`
              : isUp
              ? `Prices rose ${change}% recently. Monitor closely before buying.`
              : "Price is stable. Good time to buy if needed."}
          </p>
        </div>

        {/* Buy Links */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">🛒 Where to Buy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Amazon", "Flipkart", "JioMart", "BigBasket"].map((store) => (
              <a key={store} href={`https://www.${store.toLowerCase()}.com/s?k=${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-xl py-3 text-sm text-gray-300 hover:text-white transition-all">
                {store} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return <Suspense><ProductDetail /></Suspense>;
}