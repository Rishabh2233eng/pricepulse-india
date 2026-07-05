"use client";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { ShieldCheck, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const trending = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh tomatoes from local mandis." },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "IOCL official petrol price Delhi." },
  { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24 Karat pure gold price MCX India." },
  { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 128GB latest price." },
  { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "RE Classic 350 ex-showroom Delhi." },
  { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Motors", category: "Car", description: "Tata Nexon Smart petrol ex-showroom." },
];

const keyPrices = [
  { label: "Gold 24K", value: "₹7,240/g", change: 1.2 },
  { label: "Petrol Delhi", value: "₹94.77/L", change: 0 },
  { label: "Tomato", value: "₹42/kg", change: -12 },
  { label: "Silver", value: "₹89,500/kg", change: 2.1 },
];

const tableData = [
  { name: "Gold 24K", price: "₹7,240/g", ch: 1.2 },
  { name: "Silver", price: "₹89,500/kg", ch: 2.1 },
  { name: "Petrol Delhi", price: "₹94.77/L", ch: 0 },
  { name: "Diesel Delhi", price: "₹87.67/L", ch: 0 },
  { name: "CNG Delhi", price: "₹74.09/kg", ch: -2 },
  { name: "LPG Cylinder", price: "₹803", ch: 0 },
  { name: "Tomato", price: "₹42/kg", ch: -12 },
  { name: "Onion", price: "₹28/kg", ch: -5 },
  { name: "Potato", price: "₹22/kg", ch: 3 },
  { name: "Cashew W240", price: "₹850/kg", ch: 2 },
];

export default function Home() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setShow(true);
    const fmt = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#F7F6F3" }}>
      <Navbar />
      <TrendingBar />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 24px" }}>

        {/* Market Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }} className="full-sm">
          {keyPrices.map((m, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: show ? 1 : 0, transform: show ? "none" : "translateY(8px)", transition: "all 0.4s ease " + (i * 80) + "ms" }}>
              <div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111", fontFamily: "monospace", letterSpacing: "-0.02em" }}>{m.value}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: m.change > 0 ? "#DC2626" : m.change < 0 ? "#059669" : "#9CA3AF" }}>
                {m.change > 0 ? <TrendingUp size={12} strokeWidth={2.5} /> : m.change < 0 ? <TrendingDown size={12} strokeWidth={2.5} /> : <Minus size={12} strokeWidth={2.5} />}
                {m.change !== 0 ? Math.abs(m.change) + "%" : "—"}
              </div>
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }} className="sidebar-layout">

          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Hero Search */}
            <div style={{ background: "#111", borderRadius: 12, padding: "28px 28px 24px", opacity: show ? 1 : 0, transform: show ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.1s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 3, letterSpacing: "0.1em" }}>LIVE</span>
                <span style={{ color: "#6B7280", fontSize: 11, fontWeight: 500 }}>Updated {time || "just now"}</span>
              </div>
              <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.03em" }}>
                Real prices for<br />
                <span style={{ color: "#059669" }}>anything in India</span>
              </h1>
              <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 22, lineHeight: 1.65, fontWeight: 400 }}>
                Vegetables, gold, petrol, phones, bikes, cars — search any product and get current Indian market prices instantly.
              </p>
              <SearchBar large />
            </div>

            {/* Categories */}
            <div style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 12, padding: "20px 20px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>Browse Categories</h2>
                <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>12 categories</span>
              </div>
              <CategoryGrid />
            </div>

            {/* Trending */}
            <div style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 12, padding: "20px 20px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>Trending Today</h2>
                <Link href="/search" style={{ fontSize: 11, color: "#059669", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                  Search all <ArrowRight size={11} strokeWidth={2.5} />
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }} className="full-xs">
                {trending.map((item, i) => <PriceCard key={i} {...item} index={i} />)}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Am I Cheated */}
            <Link href="/fair-price" style={{ textDecoration: "none" }}>
              <div style={{ background: "#DC2626", borderRadius: 12, padding: "20px", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(220,38,38,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ShieldCheck size={18} color="#fff" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Am I Being Cheated?</div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 1, fontWeight: 400 }}>AI price fairness checker</div>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
                  Enter any price you paid — AI compares it with real Indian market prices instantly.
                </p>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  Check now <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>
            </Link>

            {/* Key Prices Table */}
            <div style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #F2F1EE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>Key Prices</span>
                <span style={{ fontSize: 10, color: "#888", fontWeight: 500, background: "#F2F1EE", padding: "2px 8px", borderRadius: 4 }}>Today</span>
              </div>
              {tableData.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px", borderBottom: i < tableData.length - 1 ? "1px solid #F7F6F3" : "none", transition: "background 0.1s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F7F6F3")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>{r.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111", fontFamily: "monospace", letterSpacing: "-0.01em" }}>{r.price}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: r.ch > 0 ? "#DC2626" : r.ch < 0 ? "#059669" : "#9CA3AF", minWidth: 32, textAlign: "right" }}>
                      {r.ch > 0 ? "▲" : r.ch < 0 ? "▼" : "—"}{r.ch !== 0 ? Math.abs(r.ch) + "%" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ML Insight */}
            <div style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🤖 ML Insight</div>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.7, fontWeight: 400 }}>
                Gold rising steadily. Tomato & onion prices falling — good time to buy. Petrol stable for 3+ months.
              </p>
              <Link href="/search?q=gold" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10, fontSize: 12, color: "#059669", fontWeight: 600, textDecoration: "none" }}>
                View predictions <ArrowRight size={11} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #E8E7E3", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#111", letterSpacing: "-0.02em", fontFamily: "var(--font-display)" }}>Price<span style={{ color: "#059669" }}>Pulse</span> India</span>
            <p style={{ fontSize: 11, color: "#888", marginTop: 3, fontWeight: 400 }}>Built with Next.js + Python ML + AI · Real market prices for India 🇮🇳</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ href: "/fair-price", label: "Fair Price" }, { href: "/watchlist", label: "Watchlist" }, { href: "/search", label: "Search" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: 12, color: "#888", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#059669")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#888")}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}