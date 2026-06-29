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
    router.push("/product/" + slug + "?price=" + price + "&unit=" + unit + "&change=" + change + "&source=" + source + "&category=" + category + "&description=" + encodeURIComponent(description || ""));
  };

  return (
    <div onClick={handleClick} className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-5 card-shadow card-shadow-hover transition-all duration-150 cursor-pointer group relative">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wide text-[#6B6357] border border-[#DDD4C2] px-2 py-0.5 rounded-sm">{category}</span>
        <div className={"flex items-center gap-1 text-xs font-bold " + (isUp ? "text-[#B33A2E]" : isDown ? "text-[#0F5C5C]" : "text-[#6B6357]")}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="font-display text-lg mb-2 text-[#1C1B19] group-hover:text-[#E8871E] transition-colors">{name}</h3>
      <div className="flex items-baseline gap-1 ledger-line pb-2">
        <span className="font-mono-price text-2xl font-bold text-[#1C1B19]">₹{Number(price).toLocaleString("en-IN")}</span>
        <span className="text-[#6B6357] text-sm">/ {unit}</span>
      </div>
      <p className="text-[#6B6357] text-xs mt-3">Source: {source} · Tap for full details →</p>
    </div>
  );
}