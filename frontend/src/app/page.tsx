import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PriceCard from "@/components/PriceCard";
import TrendingBar from "@/components/TrendingBar";
import CategoryGrid from "@/components/CategoryGrid";
import { ShieldCheck } from "lucide-react";
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
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <TrendingBar />

      <section className="pt-16 pb-12 px-4 border-b-2 border-[#1C1B19]">
        <div className="max-w-4xl mx-auto text-center py-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0F5C5C] border border-[#0F5C5C] px-3 py-1.5 rounded-sm mb-6 uppercase tracking-wide">
            आज का भाव · Today's Rates
          </span>
          <h1 className="font-display text-5xl md:text-6xl mb-4 leading-tight text-[#1C1B19]">
            Know the real price of
            <br />
            <span className="text-[#E8871E]">anything in India</span>
          </h1>
          <p className="text-[#6B6357] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Vegetables, gold, petrol, phones, bikes, cars — never get cheated again.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/fair-price"
            className="flex items-center justify-between bg-[#B33A2E] border-2 border-[#1C1B19] rounded-sm p-5 card-shadow card-shadow-hover transition-all duration-150 group"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-[#F7F2E9]" />
              <div>
                <h3 className="font-display text-[#F7F2E9] text-lg">Am I Being Cheated?</h3>
                <p className="text-[#F7F2E9]/80 text-sm">Enter any price you paid — AI will tell you if it was fair</p>
              </div>
            </div>
            <span className="text-[#F7F2E9] text-sm font-bold group-hover:translate-x-1 transition-transform">
              Check Now →
            </span>
          </Link>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-lg mb-4">Browse by Category</h2>
          <CategoryGrid />
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 ledger-line pb-3">
            <h2 className="font-display text-xl">Trending Prices Today</h2>
            <span className="text-xs text-[#6B6357]">Click any card for full details</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trendingPrices.map((item, i) => (
              <PriceCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#1C1B19] py-8 px-4 text-center text-[#6B6357] text-sm">
        PricePulse India · Built with Next.js + AI/ML · Made with ❤️ for India
      </footer>
    </main>
  );
}