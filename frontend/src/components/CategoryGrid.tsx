"use client";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", color: "from-green-500/20 to-green-600/5" },
  { name: "Fuel", emoji: "⛽", query: "petrol", color: "from-orange-500/20 to-orange-600/5" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", color: "from-yellow-500/20 to-yellow-600/5" },
  { name: "Smartphones", emoji: "📱", query: "phone", color: "from-blue-500/20 to-blue-600/5" },
  { name: "Laptops", emoji: "💻", query: "laptop", color: "from-purple-500/20 to-purple-600/5" },
  { name: "Bikes", emoji: "🏍️", query: "bike", color: "from-red-500/20 to-red-600/5" },
  { name: "Cars", emoji: "🚗", query: "car", color: "from-cyan-500/20 to-cyan-600/5" },
  { name: "Grocery", emoji: "🛒", query: "rice", color: "from-pink-500/20 to-pink-600/5" },
];

export default function CategoryGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          className={"bg-gradient-to-b " + cat.color + " border border-white/10 hover:border-white/20 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-105"}
        >
          <span className="text-2xl">{cat.emoji}</span>
          <span className="text-gray-300 text-xs font-medium text-center leading-tight">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}