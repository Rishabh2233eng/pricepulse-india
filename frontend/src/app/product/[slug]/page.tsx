"use client";
import { useSearchParams, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import TrendingBar from "@/components/TrendingBar";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, ExternalLink, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import PriceChart from "@/components/PriceChart";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/watchlist";

const cityPrices: Record<string, number> = {
  Delhi: 0, Mumbai: 5, Bangalore: 3, Chennai: 2,
  Hyderabad: 4, Pune: 1, Kolkata: -2, Ahmedabad: -1,
};

function ProductDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const [mlData, setMlData] = useState<any>(null);
  const [watched, setWatched] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "cities">("history");

  // Fix URL encoding — decode %2B back to +, then format name
  const rawName = decodeURIComponent(slug).replace(/-/g, " ");
  const name = rawName.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

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
    setWatched(isInWatchlist(name));
    const product = slug.split("-")[0];
    fetch("http://localhost:8000/predict/" + product)
      .then((r) => r.json())
      .then((data) => setMlData(data))
      .catch(() => {});
  }, [slug, name]);

  const toggleWatchlist = () => {
    if (watched) { removeFromWatchlist(name); setWatched(false); }
    else { addToWatchlist({ name, price, unit, category, addedAt: new Date().toISOString() }); setWatched(true); }
  };

  const handleWhatsApp = async () => {
    setSharing(true);
    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, unit, change, category, source }),
      });
      const data = await res.json();
      window.open(data.url, "_blank");
    } catch {}
    setSharing(false);
  };

  const history = [
    { date: "Today", price: basePrice },
    { date: "Yesterday", price: +(basePrice * (1 - change / 100)).toFixed(2) },
    { date: "3 Days Ago", price: +(basePrice * (1 - (change * 1.5) / 100)).toFixed(2) },
    { date: "1 Week Ago", price: +(basePrice * (1 - (change * 2) / 100)).toFixed(2) },
    { date: "1 Month Ago", price: +(basePrice * (1 - (change * 4) / 100)).toFixed(2) },
  ];

  const categoryColors: Record<string, { bg: string; text: string }> = {
    Vegetable: { bg: "#DCFCE7", text: "#166534" },
    Fruit: { bg: "#FEF9C3", text: "#854D0E" },
    "Dry Fruit": { bg: "#FEF3C7", text: "#92400E" },
    Fuel: { bg: "#FEE2E2", text: "#991B1B" },
    Commodity: { bg: "#FEF9C3", text: "#854D0E" },
    Smartphone: { bg: "#DBEAFE", text: "#1E40AF" },
    Laptop: { bg: "#EDE9FE", text: "#5B21B6" },
    Car: { bg: "#FCE7F3", text: "#9D174D" },
    Bike: { bg: "#FFEDD5", text: "#9A3412" },
    Electronics: { bg: "#DBEAFE", text: "#1E40AF" },
    Appliance: { bg: "#E0F2FE", text: "#075985" },
    Medicine: { bg: "#DCFCE7", text: "#166534" },
    Grocery: { bg: "#F3F4F6", text: "#374151" },
  };
  const catColor = categoryColors[category] || { bg: "#F3F4F6", text: "#374151" };
  const stores = ["Amazon", "Flipkart", "JioMart", "BigBasket"];

  return (
    <main style={{ minHeight: "100vh", background: "#F5F5F0" }}>
      <Navbar />
      <TrendingBar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#9CA3AF", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Markets
          </Link>
          <span style={{ color: "#E5E5E0" }}>/</span>
          <span style={{ color: "#6B6B6B", fontSize: 13 }}>{category}</span>
          <span style={{ color: "#E5E5E0" }}>/</span>
          <span style={{ color: "#1C1C1C", fontSize: 13, fontWeight: 600 }}>{name}</span>
        </div>

        {/* Header Card */}
        <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ background: catColor.bg, color: catColor.text, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 4 }}>
                  {category}
                </span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>📍 {source}</span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1C1C", marginBottom: 6, letterSpacing: "-0.02em", lineHeight: 1.2, fontFamily: "var(--font-display), sans-serif" }}>{name}</h1>
              <p style={{ fontSize: 13, color: "#6B6B6B", lineHeight: 1.6, maxWidth: 500 }}>{description}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#1C1C1C", fontFamily: "var(--font-mono), monospace", letterSpacing: "-0.03em", lineHeight: 1 }}>
                ₹{basePrice.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>per {unit}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 8, fontSize: 13, fontWeight: 700, color: isUp ? "#EF4444" : isDown ? "#00B386" : "#9CA3AF" }}>
                {isUp ? <TrendingUp size={14} /> : isDown ? <TrendingDown size={14} /> : <Minus size={14} />}
                {Math.abs(change)}% from last week
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
                <button onClick={toggleWatchlist}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", border: "1.5px solid " + (watched ? "#EF4444" : "#E5E5E0"), borderRadius: 8, background: watched ? "#FEE2E2" : "#fff", color: watched ? "#EF4444" : "#6B6B6B", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                  <Heart size={13} fill={watched ? "#EF4444" : "none"} />
                  {watched ? "Watching" : "Watch"}
                </button>
                <button onClick={handleWhatsApp}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", border: "none", borderRadius: 8, background: "#25D366", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: sharing ? 0.7 : 1 }}>
                  <Share2 size={13} />
                  {sharing ? "..." : "Share"}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 20, paddingTop: 16, borderTop: "1px solid #F0F0EB" }}>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Source: <span style={{ color: "#1C1C1C", fontWeight: 600 }}>{source}</span></div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Updated: <span style={{ color: "#1C1C1C", fontWeight: 600 }}>Just now</span></div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Category: <span style={{ color: "#1C1C1C", fontWeight: 600 }}>{category}</span></div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>

          {/* Left — Chart + History */}
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #E5E5E0" }}>
              {(["history", "cities"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ flex: 1, padding: "14px", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", color: activeTab === tab ? "#00B386" : "#9CA3AF", borderBottom: activeTab === tab ? "2px solid #00B386" : "2px solid transparent", transition: "all 0.15s" }}>
                  {tab === "history" ? "📈 Price History" : "🏙️ City-wise Prices"}
                </button>
              ))}
            </div>

            <div style={{ padding: 24 }}>
              {activeTab === "history" ? (
                <>
                  <PriceChart history={history} />
                  <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                    {history.map((h, i) => (
                      <div key={i} style={{ textAlign: "center", padding: "10px 6px", background: i === 0 ? "#DCFCE7" : "#F9F9F6", borderRadius: 8, border: "1px solid " + (i === 0 ? "#86EFAC" : "#E5E5E0") }}>
                        <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>{h.date}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "#00B386" : "#1C1C1C", fontFamily: "monospace" }}>
                          ₹{h.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F9F9F6" }}>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>City</th>
                      <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>Price</th>
                      <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>vs Delhi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(cityPrices).map(([city, diff]) => {
                      const cityPrice = basePrice + (basePrice * diff) / 100;
                      return (
                        <tr key={city} style={{ borderTop: "1px solid #F0F0EB" }}>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#1C1C1C", fontWeight: city === "Delhi" ? 700 : 400 }}>{city === "Delhi" ? "🏛️ " : ""}{city}</td>
                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#1C1C1C", fontFamily: "monospace", textAlign: "right" }}>₹{cityPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                          <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, textAlign: "right", color: diff > 0 ? "#EF4444" : diff < 0 ? "#00B386" : "#9CA3AF" }}>
                            {diff > 0 ? "+" : ""}{diff !== 0 ? diff + "%" : "Base"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right — ML + Where to buy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ML Prediction */}
            <div style={{ background: "#1C1C1C", borderRadius: 12, padding: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>🤖 ML Price Prediction</div>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 14 }}>Linear Regression · 12 months data</div>

              {mlData?.prediction ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    <div style={{ background: "#2A2A2A", borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>Current</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "monospace" }}>₹{mlData.prediction.current_price.toLocaleString("en-IN")}</div>
                    </div>
                    <div style={{ background: "#2A2A2A", borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>7 Days</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#F0B429", fontFamily: "monospace" }}>₹{mlData.prediction.predicted_price.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                  <div style={{ background: "#2A2A2A", borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>Confidence</div>
                    <div style={{ background: "#3A3A3A", borderRadius: 4, height: 6, marginBottom: 4 }}>
                      <div style={{ width: mlData.prediction.confidence + "%", height: "100%", background: "#00B386", borderRadius: 4, transition: "width 1s ease" }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#00B386" }}>{mlData.prediction.confidence}%</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: mlData.prediction.trend === "rising" ? "#EF4444" : mlData.prediction.trend === "falling" ? "#00B386" : "#9CA3AF" }}>
                    {mlData.prediction.trend === "rising" ? "📈 Price likely to Rise" : mlData.prediction.trend === "falling" ? "📉 Price likely to Fall" : "➡️ Price Stable"}
                  </div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>
                    {mlData.prediction.change_percent}% expected change
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 12 }}>
                  <div style={{ width: 14, height: 14, border: "2px solid #00B386", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  Analyzing...
                </div>
              )}
            </div>

            {/* Where to Buy */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", marginBottom: 14 }}>🛒 Where to Buy</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {stores.map((store) => (
                  <Link key={store} href={"https://www." + store.toLowerCase() + ".com"} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", background: "#F9F9F6", border: "1.5px solid #E5E5E0", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#1C1C1C", textDecoration: "none", transition: "all 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#00B386"; (e.currentTarget as HTMLElement).style.background = "#DCFCE7"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E5E0"; (e.currentTarget as HTMLElement).style.background = "#F9F9F6"; }}>
                    {store} <ExternalLink size={11} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Alert */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", marginBottom: 4 }}>🔔 Price Alert</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>Add to watchlist to track price drops</div>
              <button onClick={toggleWatchlist}
                style={{ width: "100%", padding: "10px", background: watched ? "#FEE2E2" : "#00B386", color: watched ? "#EF4444" : "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.15s" }}>
                <Heart size={14} fill={watched ? "#EF4444" : "none"} />
                {watched ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return <Suspense><ProductDetail /></Suspense>;
}