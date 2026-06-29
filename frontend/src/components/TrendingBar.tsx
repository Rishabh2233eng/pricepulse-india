"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

const trending = [
  { name: "Tomato", price: "42", change: -12, unit: "kg" },
  { name: "Gold 24K", price: "7240", change: 1.2, unit: "gram" },
  { name: "Petrol Delhi", price: "94.77", change: 0, unit: "litre" },
  { name: "Onion", price: "28", change: -5, unit: "kg" },
  { name: "iPhone 15", price: "79900", change: -3, unit: "piece" },
  { name: "Silver", price: "89500", change: 2.1, unit: "kg" },
  { name: "Diesel Delhi", price: "87.67", change: 0, unit: "litre" },
  { name: "Redmi Note 13", price: "17999", change: -2, unit: "piece" },
];

export default function TrendingBar() {
  const router = useRouter();
  return (
    <div className="w-full bg-[#1C1B19] py-2 overflow-hidden mt-16">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4">
        {trending.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push("/search?q=" + encodeURIComponent(item.name))}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:opacity-70 transition-opacity shrink-0"
          >
            <span className="text-[#F7F2E9]">{item.name}</span>
            <span className="font-mono-price text-[#E8871E] font-bold">₹{Number(item.price).toLocaleString("en-IN")}</span>
            <span className={item.change > 0 ? "text-[#E89B8C]" : item.change < 0 ? "text-[#6FBFBF]" : "text-[#6B6357]"}>
              {item.change > 0 ? <TrendingUp className="w-3 h-3 inline" /> : item.change < 0 ? <TrendingDown className="w-3 h-3 inline" /> : null}
              {item.change !== 0 ? Math.abs(item.change) + "%" : "stable"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}