"use client";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { ShieldCheck, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const trending = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh tomatoes from local mandis." },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "IOCL petrol price Delhi today." },
  { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K gold price MCX India." },
  { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 128GB." },
  { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "RE Classic 350 ex-showroom Delhi." },
  { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Motors", category: "Car", description: "Tata Nexon Smart petrol ex-showroom." },
];

const marketSummary = [
  { label: "Gold 24K", value: "₹7,240/g", change: 1.2, up: true },
  { label: "Petrol Delhi", value: "₹94.77/L", change: 0, up: false },
  { label: "Tomato", value: "₹42/kg", change: -12, up: false },
  { label: "Silver", value: "₹89,500/kg", change: 2.1, up: true },
];

export default function Home() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setShow(true);
    const update = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#F5F5F0" }}>
      <Navbar />
      <TrendingBar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* Market Summary Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24, opacity: show ? 1 : 0, transition: "opacity 0.5s ease" }}>
          {marketSummary.map((m, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1C1C1C", fontFamily: "monospace" }}>{m.value}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: m.change > 0 ? "#EF4444" : m.change < 0 ? "#00B386" : "#9CA3AF", display: "flex", alignItems: "center", gap: 2 }}>
                {m.change > 0 ? <TrendingUp size={12} /> : m.change < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                {m.change !== 0 ? Math.abs(m.change) + "%" : "Stable"}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 24 }}>

          {/* Left */}
          <div>
            {/* Hero */}
            <div style={{ background: "#1C1C1C", borderRadius: 10, padding: "28px 28px 24px", marginBottom: 16, opacity: show ? 1 : 0, transform: show ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ background: "#00B386", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 3, letterSpacing: "0.08em" }}>LIVE PRICES</span>
                <span style={{ color: "#6B7280", fontSize: 11 }}>Updated {time || "just now"}</span>
              </div>
              <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>
                Real prices for<br />
                <span style={{ color: "#00B386" }}>anything in India</span>
              </h1>
              <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                Vegetables, gold, petrol, phones, bikes, cars — search any product and get current Indian market prices instantly.
              </p>
              <SearchBar />
            </div>

            {/* Categories */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, padding: 20, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C" }}>Browse by Category</h2>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>12 categories</span>
              </div>
              <CategoryGrid />
            </div>

            {/* Trending */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C" }}>Trending Prices Today</h2>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Click for full details</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {trending.map((item, i) => <PriceCard key={i} {...item} index={i} />)}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Am I Cheated */}
            <Link href="/fair-price" style={{ textDecoration: "none" }}>
              <div style={{ background: "#EF4444", borderRadius: 10, padding: 20, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "none")}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldCheck size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Am I Being Cheated?</div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>AI price fairness checker</div>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, lineHeight: 1.5 }}>
                  Enter any price you paid — AI will tell you if it was fair compared to market price.
                </p>
                <div style={{ marginTop: 12, color: "#fff", fontSize: 12, fontWeight: 700 }}>Check now →</div>
              </div>
            </Link>

            {/* Quick Price Table */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E5E0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C" }}>Key Prices</span>
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>Today</span>
              </div>
              <table className="data-table" style={{ width: "100%" }}>
                <tbody>
                  {[
                    { name: "Gold 24K", price: "₹7,240/g", ch: 1.2, up: true },
                    { name: "Silver", price: "₹89,500/kg", ch: 2.1, up: true },
                    { name: "Petrol Delhi", price: "₹94.77/L", ch: 0, up: false },
                    { name: "Diesel Delhi", price: "₹87.67/L", ch: 0, up: false },
                    { name: "CNG Delhi", price: "₹74.09/kg", ch: -2, up: false },
                    { name: "LPG Cylinder", price: "₹803", ch: 0, up: false },
                    { name: "Tomato", price: "₹42/kg", ch: -12, up: false },
                    { name: "Onion", price: "₹28/kg", ch: -5, up: false },
                    { name: "Potato", price: "₹22/kg", ch: 3, up: true },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 12, color: "#1C1C1C", padding: "8px 16px" }}>{r.name}</td>
                      <td style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C", fontFamily: "monospace", padding: "8px 16px", textAlign: "right" }}>{r.price}</td>
                      <td style={{ fontSize: 11, fontWeight: 700, color: r.ch > 0 ? "#EF4444" : r.ch < 0 ? "#00B386" : "#9CA3AF", padding: "8px 16px", textAlign: "right" }}>
                        {r.ch > 0 ? "▲" : r.ch < 0 ? "▼" : "—"}{r.ch !== 0 ? Math.abs(r.ch) + "%" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ML Insight */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🤖 ML Insight</div>
              <div style={{ fontSize: 13, color: "#1C1C1C", lineHeight: 1.6 }}>
                Gold prices rising steadily. Tomato & onion prices falling — good time to buy vegetables. Petrol stable for 3+ months.
              </div>
              <Link href="/search?q=gold" style={{ display: "inline-block", marginTop: 10, fontSize: 12, color: "#00B386", fontWeight: 600, textDecoration: "none" }}>
                View gold prediction →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #E5E5E0", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontWeight: 700, color: "#1C1C1C" }}>Price<span style={{ color: "#00B386" }}>Pulse</span> India</span>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Built with Next.js + Python ML + AI · Real market prices for India</p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[{ href: "/fair-price", label: "Fair Price" }, { href: "/watchlist", label: "Watchlist" }, { href: "/search", label: "Search" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}