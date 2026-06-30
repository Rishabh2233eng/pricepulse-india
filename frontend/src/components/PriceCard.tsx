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
  index?: number;
}

export default function PriceCard({ name, price, unit, change, source, category, description, index = 0 }: PriceCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const router = useRouter();

  const handleClick = () => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push("/product/" + slug + "?price=" + price + "&unit=" + unit + "&change=" + change + "&source=" + source + "&category=" + category + "&description=" + encodeURIComponent(description || ""));
  };

  return (
    <div
      onClick={handleClick}
      style={{ animationDelay: index * 80 + "ms" }}
      className="fade-in-up bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-5 card-shadow card-shadow-hover transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wide text-[#6B6357] border border-[#C9BD9F] bg-[#F0E9D8] px-2 py-0.5 rounded-sm">{category}</span>
        <div className={"flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-sm " + (isUp ? "text-[#B33A2E] bg-[#B33A2E]/10" : isDown ? "text-[#0F5C5C] bg-[#0F5C5C]/10" : "text-[#6B6357] bg-[#6B6357]/10")}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="font-display text-lg mb-2 text-[#1C1B19] group-hover:text-[#E8871E] transition-colors leading-tight">{name}</h3>
      <div className="flex items-baseline gap-1 pb-2 border-b border-dashed border-[#C9BD9F]">
        <span className="font-mono-price text-2xl font-bold text-[#1C1B19]">₹{Number(price).toLocaleString("en-IN")}</span>
        <span className="text-[#6B6357] text-sm">/ {unit}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-[#6B6357] text-xs">📍 {source}</p>
        <span className="text-xs text-[#E8871E] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Details →</span>
      </div>
    </div>
  );
}