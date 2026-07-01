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

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <TrendingBar />

      {/* Hero */}
      <section className="px-6 pt-16 pb-20">
        <div
          className="max-w-4xl mx-auto text-center"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}
        >
          <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6C63FF] pulse" />
            AI-Powered · Real Prices · Any Product
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Find the real price of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#00D4AA]">
              anything in India
            </span>
          </h1>

          <p className="text-[#6B6B8A] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Search any product — vegetables, electronics, vehicles, gold — get real Indian market prices instantly powered by AI.
          </p>

          <SearchBar large />
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 mb-14">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "Any Product", l: "Search Anything" },
            { v: "AI Powered", l: "Real-time Prices" },
            { v: "50+ Cities", l: "India Coverage" },
            { v: "93% Accurate", l: "ML Predictions" },
          ].map((s, i) => (
            <div key={i} className="bg-[#12121A] border border-[#2A2A3A] rounded-2xl p-5 text-center">
              <div className="text-white font-bold text-base">{s.v}</div>
              <div className="text-[#6B6B8A] text-xs mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Am I Cheated */}
      <section className="px-6 mb-14">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/fair-price"
            className="flex items-center justify-between bg-gradient-to-r from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/25 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Am I Being Cheated?</h3>
                <p className="text-[#6B6B8A] text-sm mt-1">Enter any price you paid — AI will tell you if it was fair</p>
              </div>
            </div>
            <span className="text-[#FF6B6B] font-bold text-2xl group-hover:translate-x-2 transition-transform duration-200 shrink-0 ml-4">→</span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 mb-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">Browse Categories</h2>
            <span className="text-[#6B6B8A] text-sm">AI fetches any product</span>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 mb-14">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: <Zap className="w-5 h-5 text-[#FFB800]" />, color: "#FFB800", title: "Search Anything", desc: "No fixed database. AI fetches real prices for any product you search in India." },
            { icon: <Brain className="w-5 h-5 text-[#6C63FF]" />, color: "#6C63FF", title: "ML Price Prediction", desc: "Python ML model predicts if price will rise or fall in 7 days with 93% accuracy." },
            { icon: <TrendingUp className="w-5 h-5 text-[#00D4AA]" />, color: "#00D4AA", title: "Smart Budget Search", desc: "Try 'phone under 15k' or 'laptop above 50k' — AI understands natural language." },
          ].map((f, i) => (
            <div key={i} className="bg-[#12121A] border border-[#2A2A3A] rounded-2xl p-5 hover:border-[#2A2A4A] transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + "20" }}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
              <p className="text-[#6B6B8A] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">Trending Today</h2>
            <span className="text-[#6B6B8A] text-xs border border-[#2A2A3A] px-3 py-1 rounded-full">Click for full analysis</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trending.map((item, i) => <PriceCard key={i} {...item} index={i} />)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A2A] py-8 px-6 bg-[#0D0D16]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-lg text-white">Price<span className="text-[#6C63FF]">Pulse</span> India</span>
            <p className="text-[#6B6B8A] text-xs mt-1">Built with Next.js + Python ML + Gemini AI · Made for 🇮🇳</p>
          </div>
          <div className="flex gap-6 text-sm text-[#6B6B8A]">
            <Link href="/fair-price" className="hover:text-white transition-colors">Fair Price</Link>
            <Link href="/watchlist" className="hover:text-white transition-colors">Watchlist</Link>
            <Link href="/search" className="hover:text-white transition-colors">Search</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}