"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const trending = [
  { name: "Tomato", price: "42", change: -12 },
  { name: "Gold 24K", price: "7,240", change: 1.2 },
  { name: "Petrol Delhi", price: "94.77", change: 0 },
  { name: "Onion", price: "28", change: -5 },
  { name: "iPhone 16", price: "79,900", change: -1 },
  { name: "Silver", price: "89,500", change: 2.1 },
  { name: "Diesel Delhi", price: "87.67", change: 0 },
  { name: "Redmi Note 14", price: "19,999", change: -1 },
  { name: "Royal Enfield 350", price: "1,93,079", change: 2 },
  { name: "Maruti Swift", price: "6,99,000", change: 1 },
  { name: "CNG Delhi", price: "74.09", change: -2 },
  { name: "Potato", price: "22", change: 3 },
];

export default function TrendingBar() {
  const router = useRouter();
  const doubled = [...trending, ...trending];

  return (
    <div className="w-full bg-[#0D0D16] border-b border-white/5 py-2.5 overflow-hidden mt-16">
      <div className="ticker-animate gap-0">
        {doubled.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push("/search?q=" + encodeURIComponent(item.name))}
            className="flex items-center gap-2 whitespace-nowrap text-xs px-5 border-r border-white/5 hover:bg-white/5 transition-colors py-1 shrink-0"
          >
            <span className="text-[#9090B0]">{item.name}</span>
            <span className="font-mono-price text-white font-bold">₹{item.price}</span>
            <span className={item.change > 0 ? "text-[#FF6B6B]" : item.change < 0 ? "text-[#00D4AA]" : "text-[#6B6B8A]"}>
              {item.change > 0 ? <TrendingUp className="w-3 h-3 inline" /> : item.change < 0 ? <TrendingDown className="w-3 h-3 inline" /> : <Minus className="w-3 h-3 inline" />}
              {" "}{item.change !== 0 ? Math.abs(item.change) + "%" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}