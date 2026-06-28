"use client";
import { useSearchParams, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

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
  const [mlData, setMlData] = useState<any>(null);

  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const price = searchParams.get("price") || "0";
  const unit = searchParams.get("unit") || "unit";
  const change = parseFloat(searchParams.get("change") || "0");
  const source = searchParams.get("source") || "Market";
  const category = searchParams.get("category") || "General";
  const description = decodeURIComponent(searchParams.get("description") || "");
  const isUp = change > 0;
  const isDown = change < 0;
  const basePrice = parseFloat(price.replace(/,/g, "")) || 0;

  useEffect(() => {
    const product = slug.split("-")[0];
    fetch("http://localhost:8000/predict/" + product)
      .then((r) => r.json())
      .then((data) => setMlData(data))
      .catch(() => {});
  }, [slug]);

  const history = [
    { date: "Today", price: basePrice },
    { date: "Yesterday", price: basePrice * (1 - change / 100) },
    { date: "3 Days Ago", price: basePrice * (1 - (change * 1.5) / 100) },
    { date: "1 Week Ago", price: basePrice * (1 - (change * 2) / 100) },
    { date: "1 Month Ago", price: basePrice * (1 - (change * 4) / 100) },
  ];

  const stores = ["Amazon", "Flipkart", "JioMart", "BigBasket"];

  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full mb-3 inline-block">{category}</span>
              <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
              <p className="text-gray-400 text-sm max-w-lg">{description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-400">
                {"₹" + basePrice.toLocaleString("en-IN")}
              </div>
              <div className="text-gray-400 text-sm">{"per " + unit}</div>
              <div className={"flex items-center justify-end gap-1 mt-2 text-sm font-medium " + (isUp ? "text-red-400" : isDown ? "text-emerald-400" : "text-gray-400")}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                {Math.abs(change) + "% from last week"}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 text-xs text-gray-500">
            <span>Source: <span className="text-gray-300">{source}</span></span>
            <span>Updated: <span className="text-gray-300">Just now</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">📈 Price History</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{h.date}</span>
                  <span className={"font-semibold text-sm " + (i === 0 ? "text-emerald-400" : "text-white")}>
                    {"₹" + h.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">🏙️ City-wise Prices</h2>
            <div className="space-y-3">
              {Object.entries(cityPrices).map(([city, diff]) => {
                const cityPrice = basePrice + (basePrice * diff) / 100;
                return (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{city}</span>
                    <span className="text-white font-semibold text-sm">
                      {"₹" + cityPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-1">🤖 ML Price Prediction</h2>
          <p className="text-gray-400 text-sm mb-4">Powered by Linear Regression trained on 12 months of Indian market data</p>

          {mlData && mlData.prediction ? (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">Current Price</p>
                <p className="text-white text-xl font-bold">
                  {"₹" + mlData.prediction.current_price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">Predicted (7 days)</p>
                <p className="text-emerald-400 text-xl font-bold">
                  {"₹" + mlData.prediction.predicted_price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">Model Confidence</p>
                <p className="text-white text-xl font-bold">{mlData.prediction.confidence + "%"}</p>
              </div>
              <div className="col-span-3 flex items-center gap-3 mt-1">
                <span className={"text-lg font-bold " + (mlData.prediction.trend === "rising" ? "text-red-400" : mlData.prediction.trend === "falling" ? "text-emerald-400" : "text-gray-400")}>
                  {mlData.prediction.trend === "rising" ? "📈 Price likely to Rise" : mlData.prediction.trend === "falling" ? "📉 Price likely to Fall" : "➡️ Price Stable"}
                </span>
                <span className="text-gray-500 text-sm">
                  {"(" + mlData.prediction.change_percent + "% change expected in 7 days)"}
                </span>
              </div>
              {mlData.alert && (
                <div className="col-span-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                  {mlData.alert}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              Analyzing price trends with ML model...
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">🛒 Where to Buy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stores.map((store) => (
              <Link
                key={store}
                href={"https://www." + store.toLowerCase() + ".com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-xl py-3 text-sm text-gray-300 hover:text-white transition-all"
              >
                {store} <ExternalLink className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense>
      <ProductDetail />
    </Suspense>
  );
}