"use client";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { ShieldCheck, TrendingUp, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const trendingPrices = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh tomatoes from local mandis." },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Delhi." },
  { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K gold price on MCX." },
  { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 128GB." },
  { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "RE Classic 350 ex-showroom Delhi." },
  { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi ex-showroom Delhi." },
];

const stats = [
  { label: "Products Tracked", value: "500+" },
  { label: "Price Categories", value: "12" },
  { label: "Cities Covered", value: "50+" },
  { label: "ML Accuracy", value: "93%" },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <TrendingBar />

      <section className="pt-16 pb-12 px-4 border-b-2 border-[#1C1B19]">
        <div className="max-w-4xl mx-auto text-center py-8">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0F5C5C] border-2 border-[#0F5C5C] px-3 py-1.5 rounded-sm mb-6 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0F5C5C] pulse-dot" />
              आज का भाव · Live Prices
            </span>
            <h1 className="font-display text-5xl md:text-7xl mb-4 leading-tight text-[#1C1B19]">
              Know the real price
              <br />
              <span className="text-[#E8871E] relative">
                of anything
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#E8871E] opacity-30 rounded" />
              </span>
              <br />
              in India
            </h1>
            <p className="text-[#5C5347] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Vegetables, gold, petrol, phones, bikes, cars — never get cheated again. Powered by AI + ML.
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="py-4 px-4 bg-[#1C1B19]">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center py-3">
              <div className="font-mono-price text-2xl font-bold text-[#E8871E]">{stat.value}</div>
              <div className="text-[#B8A878] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/fair-price"
            className="flex items-center justify-between bg-[#B33A2E] border-2 border-[#1C1B19] rounded-sm p-5 card-shadow card-shadow-hover transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1C1B19]/20 rounded-sm flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#F7F2E9]" />
              </div>
              <div>
                <h3 className="font-display text-[#F7F2E9] text-xl">Am I Being Cheated?</h3>
                <p className="text-[#F7F2E9]/70 text-sm mt-0.5">Enter any price you paid — AI will tell you if it was fair</p>
              </div>
            </div>
            <span className="text-[#F7F2E9] font-bold group-hover:translate-x-2 transition-transform duration-200 text-lg">→</span>
          </Link>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Browse by Category</h2>
            <span className="text-xs text-[#6B6357] border border-[#C9BD9F] px-2 py-1 rounded-sm">12 categories</span>
          </div>
          <CategoryGrid />
        </div>
      </section>

      <section className="py-8 px-4 bg-[#DCCDA8] border-y-2 border-[#1C1B19]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: <Zap className="w-5 h-5" />, title: "Real-Time + AI Fallback", desc: "500+ products in database. Unknown items fetched live via Gemini AI." },
            { icon: <Brain className="w-5 h-5" />, title: "ML Price Prediction", desc: "93% accurate 7-day forecast using Linear Regression on historical data." },
            { icon: <TrendingUp className="w-5 h-5" />, title: "Smart Budget Search", desc: "Search 'phone under 15k' or 'laptop above 50k' — AI understands you." },
          ].map((f, i) => (
            <div key={i} className="flex gap-3 p-4 bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm card-shadow">
              <div className="w-8 h-8 bg-[#E8871E] border-2 border-[#1C1B19] rounded-sm flex items-center justify-center shrink-0 text-[#1C1B19]">{f.icon}</div>
              <div>
                <h3 className="text-[#1C1B19] font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-[#6B6357] text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-dashed border-[#B8A878]">
            <h2 className="font-display text-xl">Trending Prices Today</h2>
            <span className="text-xs text-[#6B6357]">Click any card for full details</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trendingPrices.map((item, i) => (
              <PriceCard key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#1C1B19] py-8 px-4 bg-[#1C1B19]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-display text-[#F7F2E9] text-lg">Price<span className="text-[#E8871E]">Pulse</span> India</span>
            <p className="text-[#6B6357] text-xs mt-1">Built with Next.js + Python + AI/ML · Made with ❤️ for India</p>
          </div>
          <div className="flex gap-4 text-xs text-[#6B6357]">
            <Link href="/fair-price" className="hover:text-[#E8871E] transition-colors">Fair Price</Link>
            <Link href="/watchlist" className="hover:text-[#E8871E] transition-colors">Watchlist</Link>
            <Link href="/search" className="hover:text-[#E8871E] transition-colors">Search</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}