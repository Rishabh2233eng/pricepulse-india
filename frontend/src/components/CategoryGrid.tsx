"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", color: "#DCFCE7", text: "#166534" },
  { name: "Fruits", emoji: "🍎", query: "mango", color: "#FEF9C3", text: "#854D0E" },
  { name: "Dry Fruits", emoji: "🥜", query: "cashew", color: "#FEF3C7", text: "#92400E" },
  { name: "Fuel", emoji: "⛽", query: "petrol", color: "#FEE2E2", text: "#991B1B" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", color: "#FEF9C3", text: "#854D0E" },
  { name: "Smartphones", emoji: "📱", query: "phone", color: "#DBEAFE", text: "#1E40AF" },
  { name: "Laptops", emoji: "💻", query: "laptop", color: "#EDE9FE", text: "#5B21B6" },
  { name: "Bikes", emoji: "🏍️", query: "royal enfield", color: "#FFEDD5", text: "#9A3412" },
  { name: "Cars", emoji: "🚗", query: "tata nexon", color: "#FCE7F3", text: "#9D174D" },
  { name: "Electronics", emoji: "📺", query: "samsung tv", color: "#DBEAFE", text: "#1E40AF" },
  { name: "Appliances", emoji: "❄️", query: "ac", color: "#E0F2FE", text: "#075985" },
  { name: "Grocery", emoji: "🛒", query: "dal", color: "#F3F4F6", text: "#374151" },
];

export default function CategoryGrid() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
      {categories.map((cat, i) => (
        <button
          key={cat.name}
          onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          onMouseEnter={() => setHovered(cat.name)}
          onMouseLeave={() => setHovered(null)}
          style={{
            animationDelay: i * 30 + "ms",
            background: hovered === cat.name ? cat.color : "#fff",
            border: "1px solid " + (hovered === cat.name ? cat.text + "40" : "#E5E5E0"),
            borderRadius: 8,
            padding: "12px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            transition: "all 0.15s ease",
            transform: hovered === cat.name ? "translateY(-2px)" : "none",
          }}
          className="fade-up"
        >
          <span style={{ fontSize: 22 }}>{cat.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: hovered === cat.name ? cat.text : "#6B6B6B", textAlign: "center", lineHeight: 1.2 }}>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}