"use client";
import { useSearchParams, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import PriceChart from "@/components/PriceChart";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/watchlist";

const cityPrices: Record<string, number> = {
  Delhi: 0, Mumbai: 5, Bangalore: 3, Chennai: 2, Hyderabad: 4, Pune: 1, Kolkata: -2, Ahmedabad: -1,
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

  const [watched, setWatched] = useState(false);

  useEffect(() => {
    setWatched(isInWatchlist(name));
  }, [name]);

  const toggleWatchlist = () => {
    if (watched) {
      removeFromWatchlist(name);
      setWatched(false);
    } else {
      addToWatchlist({ name, price, unit, category, addedAt: new Date().toISOString() });
      setWatched(true);
    }
  };

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
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-[#6B6357] hover:text-[#1C1B19] text-sm mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        <div className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-6 mb-6 card-shadow">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-[#0F5C5C] border border-[#0F5C5C] px-2 py-1 rounded-sm mb-3 inline-block">{category}</span>
              <h1 className="font-display text-3xl mb-2">{name}</h1>
              <p className="text-[#6B6357] text-sm max-w-lg">{description}</p>
            </div>
            <div className="text-right">
              <button
                onClick={toggleWatchlist}
                className={"inline-flex items-center gap-1.5 mb-2 px-3 py-1.5 rounded-sm border-2 border-[#1C1B19] text-xs font-bold transition-all " + (watched ? "bg-[#B33A2E] text-white" : "bg-[#FBF8F1] text-[#1C1B19]")}
              >
                <Heart className="w-3 h-3" fill={watched ? "white" : "none"} />
                {watched ? "Watching" : "Add to Watchlist"}
              </button>
              <div className="font-mono-price text-4xl font-bold text-[#1C1B19]">
                ₹{basePrice.toLocaleString("en-IN")}
              </div>
              <div className="text-[#6B6357] text-sm">per {unit}</div>
              <div className={"flex items-center justify-end gap-1 mt-2 text-sm font-bold " + (isUp ? "text-[#B33A2E]" : isDown ? "text-[#0F5C5C]" : "text-[#6B6357]")}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                {Math.abs(change)}% from last week
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 ledger-line flex items-center gap-6 text-xs text-[#6B6357]">
            <span>Source: <span className="text-[#1C1B19] font-bold">{source}</span></span>
            <span>Updated: <span className="text-[#1C1B19] font-bold">Just now</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-6 card-shadow">
            <h2 className="font-display text-lg mb-4">📈 Price History</h2>
            <PriceChart history={history} />
          </div>

          <div className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-6 card-shadow">
            <h2 className="font-display text-lg mb-4">🏙️ City-wise Prices</h2>
            <div className="space-y-3">
              {Object.entries(cityPrices).map(([city, diff]) => {
                const cityPrice = basePrice + (basePrice * diff) / 100;
                return (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-[#6B6357] text-sm">{city}</span>
                    <span className="font-mono-price text-[#1C1B19] font-bold text-sm">
                      ₹{cityPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-[#1C1B19] border-2 border-[#1C1B19] rounded-sm p-6 mb-6 card-shadow">
          <h2 className="font-display text-lg mb-1 text-[#F7F2E9]">🤖 ML Price Prediction</h2>
          <p className="text-[#B8A878] text-sm mb-4">Powered by Linear Regression trained on 12 months of Indian market data</p>

          {mlData && mlData.prediction ? (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#2A2823] rounded-sm p-4">
                <p className="text-[#B8A878] text-xs mb-1">Current Price</p>
                <p className="font-mono-price text-[#F7F2E9] text-xl font-bold">
                  ₹{mlData.prediction.current_price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-[#2A2823] rounded-sm p-4">
                <p className="text-[#B8A878] text-xs mb-1">Predicted (7 days)</p>
                <p className="font-mono-price text-[#E8871E] text-xl font-bold">
                  ₹{mlData.prediction.predicted_price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-[#2A2823] rounded-sm p-4">
                <p className="text-[#B8A878] text-xs mb-1">Model Confidence</p>
                <p className="font-mono-price text-[#F7F2E9] text-xl font-bold">{mlData.prediction.confidence}%</p>
              </div>
              <div className="col-span-3 flex items-center gap-3 mt-1">
                <span className={"text-lg font-bold " + (mlData.prediction.trend === "rising" ? "text-[#E89B8C]" : mlData.prediction.trend === "falling" ? "text-[#6FBFBF]" : "text-[#B8A878]")}>
                  {mlData.prediction.trend === "rising" ? "📈 Price likely to Rise" : mlData.prediction.trend === "falling" ? "📉 Price likely to Fall" : "➡️ Price Stable"}
                </span>
                <span className="text-[#B8A878] text-sm">
                  ({mlData.prediction.change_percent}% change expected in 7 days)
                </span>
              </div>
              {mlData.alert && (
                <div className="col-span-3 bg-[#B33A2E]/20 border border-[#B33A2E] rounded-sm p-3 text-[#E89B8C] text-sm">
                  {mlData.alert}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#B8A878] text-sm">
              <div className="w-4 h-4 border-2 border-[#E8871E] border-t-transparent rounded-full animate-spin" />
              Analyzing price trends with ML model...
            </div>
          )}
        </div>

        <div className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-6 card-shadow">
          <h2 className="font-display text-lg mb-4">🛒 Where to Buy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stores.map((store) => (
              <Link
                key={store}
                href={"https://www." + store.toLowerCase() + ".com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#F0E9D8] hover:bg-[#E8871E] border-2 border-[#1C1B19] rounded-sm py-3 text-sm font-bold text-[#1C1B19] transition-all"
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
  return <Suspense><ProductDetail /></Suspense>;
}