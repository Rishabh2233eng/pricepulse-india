"use client";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", color: "#00D4AA" },
  { name: "Fuel", emoji: "⛽", query: "petrol", color: "#FFB800" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", color: "#FFB800" },
  { name: "Smartphones", emoji: "📱", query: "phone", color: "#6C63FF" },
  { name: "Laptops", emoji: "💻", query: "laptop", color: "#6C63FF" },
  { name: "Bikes", emoji: "🏍️", query: "bike", color: "#FF6B6B" },
  { name: "Cars", emoji: "🚗", query: "car", color: "#FF6B6B" },
  { name: "Grocery", emoji: "🛒", query: "dal", color: "#00D4AA" },
  { name: "Electronics", emoji: "📺", query: "samsung tv", color: "#6C63FF" },
  { name: "Appliances", emoji: "❄️", query: "ac", color: "#00D4AA" },
  { name: "Real Estate", emoji: "🏠", query: "rent delhi", color: "#FFB800" },
  { name: "Medicines", emoji: "💊", query: "paracetamol", color: "#FF6B6B" },
];

export default function CategoryGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
      {categories.map((cat, i) => (
        <button
          key={cat.name}
          onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          style={{ animationDelay: i * 40 + "ms", "--cat-color": cat.color } as any}
          className="fade-up bg-[#12121A] border border-[#2A2A3A] hover:border-[--cat-color] rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-1 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
          <span className="text-[#9090B0] group-hover:text-white text-xs font-medium text-center leading-tight transition-colors">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}