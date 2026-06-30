"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

const trending = [
  { name: "Tomato", price: "42", change: -12 },
  { name: "Gold 24K", price: "7240", change: 1.2 },
  { name: "Petrol Delhi", price: "94.77", change: 0 },
  { name: "Onion", price: "28", change: -5 },
  { name: "iPhone 15", price: "79900", change: -3 },
  { name: "Silver", price: "89500", change: 2.1 },
  { name: "Diesel Delhi", price: "87.67", change: 0 },
  { name: "Redmi Note 13", price: "17999", change: -2 },
  { name: "Royal Enfield", price: "193079", change: 2 },
  { name: "Maruti Swift", price: "699000", change: 1 },
  { name: "CNG Delhi", price: "74.09", change: -2 },
  { name: "Potato", price: "22", change: 3 },
];

export default function TrendingBar() {
  const router = useRouter();
  const doubled = [...trending, ...trending];

  return (
    <div className="w-full bg-[#1C1B19] py-2.5 overflow-hidden mt-16">
      <div className="ticker-animate">
        {doubled.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push("/search?q=" + encodeURIComponent(item.name))}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:opacity-70 transition-opacity shrink-0 px-6 border-r border-white/10"
          >
            <span className="text-[#F7F2E9]">{item.name}</span>
            <span className="font-mono-price text-[#E8871E] font-bold">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>
            <span className={item.change > 0 ? "text-[#E89B8C]" : item.change < 0 ? "text-[#6FBFBF]" : "text-[#6B6357]"}>
              {item.change > 0 ? <TrendingUp className="w-3 h-3 inline" /> : item.change < 0 ? <TrendingDown className="w-3 h-3 inline" /> : "—"}
              {item.change !== 0 ? " " + Math.abs(item.change) + "%" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}