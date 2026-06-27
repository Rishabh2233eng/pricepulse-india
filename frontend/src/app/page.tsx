"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import { Sparkles, Zap, Brain } from "lucide-react";

interface Price {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
}

const defaultPrices: Price[] = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable" },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
  { name: "Gold 24K", price: "7,240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity" },
  { name: "Onion", price: "28", unit: "kg", change: -5, source: "Agmarknet", category: "Vegetable" },
  { name: "Diesel Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel" },
  { name: "Silver", price: "89,500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity" },
];

const features = [
  { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: "Real-Time Prices", desc: "Live data scraped from official Indian market sources" },
  { icon: <Brain className="w-5 h-5 text-emerald-400" />, title: "AI Predictions", desc: "ML models predict if prices will rise or fall next week" },
  { icon: <Sparkles className="w-5 h-5 text-emerald-400" />, title: "Natural Search", desc: "Search in Hindi or English — AI understands you" },
];

export default function Home() {
  const [results, setResults] = useState<Price[]>(defaultPrices);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleResults = (prices: Price[], query: string) => {
    setResults(prices);
    setSearchQuery(query);
    setSearched(true);
  };

  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live market prices across India
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Know the real price of
            <br />
            <span className="text-emerald-400">anything in India</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            From vegetables to gold, petrol to electronics — search any product and get current market prices powered by AI.
          </p>
          <SearchBar onResults={handleResults} />
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-3 p-4">
              <div className="mt-0.5">{f.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">
              {searched ? `Results for "${searchQuery}"` : "Trending Prices Today"}
            </h2>
            <span className="text-xs text-gray-500">Updated just now</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {results.map((item, i) => (
              <PriceCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-4 text-center text-gray-600 text-sm">
        PricePulse India · Built with Next.js + AI/ML · Data from Indian public sources
      </footer>
    </main>
  );
}