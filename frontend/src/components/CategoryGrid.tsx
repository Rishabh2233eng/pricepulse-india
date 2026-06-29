"use client";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Vegetables", emoji: "🥦", query: "tomato" },
  { name: "Fuel", emoji: "⛽", query: "petrol" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold" },
  { name: "Smartphones", emoji: "📱", query: "phone" },
  { name: "Laptops", emoji: "💻", query: "laptop" },
  { name: "Bikes", emoji: "🏍️", query: "bike" },
  { name: "Cars", emoji: "🚗", query: "car" },
  { name: "Grocery", emoji: "🛒", query: "rice" },
];

export default function CategoryGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          className="bg-[#FBF8F1] border-2 border-[#1C1B19] hover:bg-[#E8871E] rounded-sm p-4 flex flex-col items-center gap-2 transition-all duration-150 card-shadow card-shadow-hover"
        >
          <span className="text-2xl">{cat.emoji}</span>
          <span className="text-[#1C1B19] text-xs font-bold text-center leading-tight">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}