import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { Sparkles, Zap, Brain, ShieldCheck } from "lucide-react";
import Link from "next/link";

const trendingPrices = [
  { name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh tomatoes from local mandis." },
  { name: "Petrol Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Delhi." },
  { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24K gold price on MCX." },
  { name: "iPhone 15", price: "79900", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB." },
  { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "RE Classic 350 ex-showroom Delhi." },
  { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi ex-showroom Delhi." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <TrendingBar />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live market prices across India
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
            Know the real price of
            <br />
            <span className="text-emerald-400">anything in India</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Vegetables, gold, petrol, phones, bikes, cars — never get cheated again.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/fair-price"
            className="flex items-center justify-between bg-gradient-to-r from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 rounded-2xl p-5 hover:border-emerald-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <div>
                <h3 className="text-white font-bold text-lg">Am I Being Cheated?</h3>
                <p className="text-gray-400 text-sm">Enter any price you paid — AI will tell you if it was fair</p>
              </div>
            </div>
            <span className="text-emerald-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Check Now →
            </span>
          </Link>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-bold text-lg mb-4">Browse by Category</h2>
          <CategoryGrid />
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: "Real-Time Prices", desc: "Live data from official Indian market sources" },
            { icon: <Brain className="w-5 h-5 text-emerald-400" />, title: "ML Predictions", desc: "93% accurate price prediction for next 7 days" },
            { icon: <Sparkles className="w-5 h-5 text-emerald-400" />, title: "AI Search", desc: "Search naturally — cheapest phone under 20k" },
          ].map((f, i) => (
            <div key={i} className="flex gap-3 p-4 bg-white/3 border border-white/5 rounded-2xl">
              <div className="mt-0.5">{f.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Trending Prices Today</h2>
            <span className="text-xs text-gray-500">Click any card for full details</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trendingPrices.map((item, i) => (
              <PriceCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-4 text-center text-gray-600 text-sm">
        PricePulse India · Built with Next.js + AI/ML · Made with ❤️ for India
      </footer>
    </main>
  );
}