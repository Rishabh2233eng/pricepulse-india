"use client";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", bg: "#E8F5E9" },
  { name: "Fuel", emoji: "⛽", query: "petrol", bg: "#FFF3E0" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", bg: "#FFFDE7" },
  { name: "Smartphones", emoji: "📱", query: "phone", bg: "#E3F2FD" },
  { name: "Laptops", emoji: "💻", query: "laptop", bg: "#F3E5F5" },
  { name: "Bikes", emoji: "🏍️", query: "bike", bg: "#FCE4EC" },
  { name: "Cars", emoji: "🚗", query: "car", bg: "#E0F7FA" },
  { name: "Grocery", emoji: "🛒", query: "rice", bg: "#F9FBE7" },
  { name: "Electronics", emoji: "📺", query: "tv", bg: "#E8EAF6" },
  { name: "Appliances", emoji: "🫙", query: "ac", bg: "#E0F2F1" },
  { name: "Real Estate", emoji: "🏠", query: "rent", bg: "#FBE9E7" },
  { name: "Medicines", emoji: "💊", query: "medicine", bg: "#F1F8E9" },
];

export default function CategoryGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
      {categories.map((cat, i) => (
        <button
          key={cat.name}
          onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          style={{ animationDelay: i * 50 + "ms", backgroundColor: cat.bg }}
          className="fade-in-up border-2 border-[#1C1B19] rounded-sm p-4 flex flex-col items-center gap-2 transition-all duration-200 card-shadow card-shadow-hover group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
          <span className="text-[#1C1B19] text-xs font-bold text-center leading-tight">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}