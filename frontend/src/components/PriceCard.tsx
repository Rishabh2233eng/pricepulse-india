"use client";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
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
      style={{ animationDelay: index * 60 + "ms" }}
      className="price-card p-5 fade-up group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="tag">{category}</span>
        <div className={"flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full " + (isUp ? "tag-red" : isDown ? "tag-green" : "bg-white/5 text-[#6B6B8A]")}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {change !== 0 ? Math.abs(change) + "%" : "stable"}
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#6C63FF] transition-colors leading-snug">{name}</h3>
      <p className="text-[#6B6B8A] text-xs mb-4 line-clamp-1">{description}</p>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-mono-price text-2xl font-bold text-white">₹{Number(price).toLocaleString("en-IN")}</span>
        <span className="text-[#6B6B8A] text-xs">/ {unit}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-[#6B6B8A] text-xs">📍 {source}</span>
        <span className="text-[#6C63FF] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View details <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}