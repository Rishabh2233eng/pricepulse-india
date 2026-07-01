"use client";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { ShieldCheck, Zap, Brain, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const trending = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh tomatoes from local mandis." },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Delhi today." },
  { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K gold price on MCX." },
  { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 128GB." },
  { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "RE Classic 350 ex-showroom Delhi." },
  { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi ex-showroom Delhi." },
];

const stats = [
  { v: "Any Product", l: "Search Anything" },
  { v: "AI Powered", l: "Real-time Prices" },
  { v: "50+ Cities", l: "India Coverage" },
  { v: "93% Accurate", l: "ML Predictions" },
];

const features = [
  { icon: <Zap size={20} color="#FFB800" />, color: "#FFB800", title: "Search Anything", desc: "No fixed database. AI fetches real prices for any product you search in India." },
  { icon: <Brain size={20} color="#6C63FF" />, color: "#6C63FF", title: "ML Price Prediction", desc: "Python ML model predicts if price will rise or fall in 7 days with 93% accuracy." },
  { icon: <TrendingUp size={20} color="#00D4AA" />, color: "#00D4AA", title: "Smart Budget Search", desc: "Try 'phone under 15k' or 'laptop above 50k' — AI understands natural language." },
];

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0F", color: "#F0F0FF" }}>
      <Navbar />
      <TrendingBar />

      {/* Hero */}
      <section style={{ padding: "80px 24px 80px", borderBottom: "1px solid #1A1A2A" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", opacity: show ? 1 : 0, transform: show ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", color: "#6C63FF", fontSize: 11, fontWeight: 700, padding: "8px 16px", borderRadius: 999, marginBottom: 32, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6C63FF", display: "inline-block" }} className="pulse" />
            AI-Powered · Real Prices · Any Product
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Find the real price of
            <br />
            <span style={{ background: "linear-gradient(90deg, #6C63FF, #00D4AA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              anything in India
            </span>
          </h1>

          <p style={{ color: "#6B6B8A", fontSize: 18, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Search any product — vegetables, electronics, vehicles, gold — get real Indian market prices instantly powered by AI.
          </p>

          <SearchBar large />
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "40px 24px", background: "#0D0D16", borderBottom: "1px solid #1A1A2A" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#12121A", border: "1px solid #2A2A3A", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{s.v}</div>
              <div style={{ color: "#6B6B8A", fontSize: 12, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Am I Cheated */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link href="/fair-price" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(90deg, rgba(255,107,107,0.08), transparent)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 20, padding: 24, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,107,107,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,107,107,0.2)")}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 52, height: 52, background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldCheck size={24} color="#FF6B6B" />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Am I Being Cheated?</div>
                <div style={{ color: "#6B6B8A", fontSize: 14, marginTop: 4 }}>Enter any price you paid — AI will tell you if it was fair</div>
              </div>
            </div>
            <span style={{ color: "#FF6B6B", fontSize: 24, fontWeight: 700, marginLeft: 16 }}>→</span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "20px 24px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>Browse Categories</h2>
            <span style={{ color: "#6B6B8A", fontSize: 13 }}>AI fetches any product</span>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "20px 24px 40px", background: "#0D0D16" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: "#12121A", border: "1px solid #2A2A3A", borderRadius: 20, padding: 20 }}>
              <div style={{ width: 40, height: 40, background: f.color + "20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                {f.icon}
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "#6B6B8A", fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section style={{ padding: "40px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>Trending Today</h2>
            <span style={{ color: "#6B6B8A", fontSize: 12, border: "1px solid #2A2A3A", padding: "4px 12px", borderRadius: 999 }}>Click for full analysis</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {trending.map((item, i) => <PriceCard key={i} {...item} index={i} />)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1A1A2A", padding: "32px 24px", background: "#0D0D16" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Price<span style={{ color: "#6C63FF" }}>Pulse</span> India</span>
            <p style={{ color: "#6B6B8A", fontSize: 12, marginTop: 4 }}>Built with Next.js + Python ML + Gemini AI · Made for 🇮🇳</p>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[{ href: "/fair-price", label: "Fair Price" }, { href: "/watchlist", label: "Watchlist" }, { href: "/search", label: "Search" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "#6B6B8A", textDecoration: "none", fontSize: 14 }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}