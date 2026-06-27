"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

interface PriceCardProps {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
  description?: string;
}

export default function PriceCard({ name, price, unit, change, source, category, description }: PriceCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const router = useRouter();

  const handleClick = () => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/product/${slug}?price=${price}&unit=${unit}&change=${change}&source=${source}&category=${category}&description=${encodeURIComponent(description || "")}`);
  };

  return (
    <div onClick={handleClick} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 hover:bg-white/8 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{category}</span>
        <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? "text-red-400" : isDown ? "text-emerald-400" : "text-gray-400"}`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-emerald-400">₹{Number(price).toLocaleString("en-IN")}</span>
        <span className="text-gray-500 text-sm">/ {unit}</span>
      </div>
      <p className="text-gray-600 text-xs mt-3">Source: {source} · Tap for details →</p>
    </div>
  );
}