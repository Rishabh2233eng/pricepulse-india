"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const cats = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", bg: "#ECFDF5", color: "#065F46" },
  { name: "Fruits", emoji: "🍎", query: "mango", bg: "#FFFBEB", color: "#92400E" },
  { name: "Dry Fruits", emoji: "🥜", query: "cashew", bg: "#FEF3C7", color: "#78350F" },
  { name: "Fuel", emoji: "⛽", query: "petrol", bg: "#FEF2F2", color: "#991B1B" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", bg: "#FFFBEB", color: "#92400E" },
  { name: "Smartphones", emoji: "📱", query: "iphone 16", bg: "#EFF6FF", color: "#1E3A8A" },
  { name: "Laptops", emoji: "💻", query: "macbook", bg: "#F5F3FF", color: "#4C1D95" },
  { name: "Bikes", emoji: "🏍️", query: "royal enfield", bg: "#FFF7ED", color: "#7C2D12" },
  { name: "Cars", emoji: "🚗", query: "tata nexon", bg: "#FDF2F8", color: "#831843" },
  { name: "Electronics", emoji: "📺", query: "samsung tv", bg: "#EFF6FF", color: "#1E3A8A" },
  { name: "Appliances", emoji: "❄️", query: "ac", bg: "#F0F9FF", color: "#0C4A6E" },
  { name: "Grocery", emoji: "🛒", query: "dal", bg: "#F9FAFB", color: "#1F2937" },
];

export default function CategoryGrid() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }} className="full-sm">
      {cats.map((cat, i) => (
        <button key={cat.name} onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          onMouseEnter={() => setHovered(cat.name)} onMouseLeave={() => setHovered(null)}
          style={{ animationDelay: i * 25 + "ms", background: hovered === cat.name ? cat.bg : "#fff", border: "1px solid " + (hovered === cat.name ? cat.color + "30" : "#E8E7E3"), borderRadius: 9, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", transition: "all 0.15s ease", transform: hovered === cat.name ? "translateY(-2px)" : "none", boxShadow: hovered === cat.name ? "0 4px 12px rgba(0,0,0,0.06)" : "none" }}
          className="fade-up">
          <span style={{ fontSize: 22, lineHeight: 1 }}>{cat.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: hovered === cat.name ? cat.color : "#555", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.01em" }}>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}