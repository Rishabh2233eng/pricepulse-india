"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const cats = [
  { name: "Vegetables", emoji: "🥦", query: "tomato", bg: "#E8F5EE", color: "#1E5C3A" },
  { name: "Fruits", emoji: "🍎", query: "mango", bg: "#FDF6E3", color: "#8B6914" },
  { name: "Dry Fruits", emoji: "🥜", query: "cashew", bg: "#FEF3C7", color: "#78350F" },
  { name: "Fuel", emoji: "⛽", query: "petrol", bg: "#FDEDEB", color: "#9B2C1E" },
  { name: "Gold & Silver", emoji: "🥇", query: "gold", bg: "#FDF6E3", color: "#8B6914" },
  { name: "Smartphones", emoji: "📱", query: "iphone 16", bg: "#EFF6FF", color: "#1E3A8A" },
  { name: "Laptops", emoji: "💻", query: "macbook", bg: "#F5F3FF", color: "#4C1D95" },
  { name: "Bikes", emoji: "🏍️", query: "royal enfield", bg: "#FFF4EC", color: "#7C2D0E" },
  { name: "Cars", emoji: "🚗", query: "tata nexon", bg: "#FFF0F6", color: "#7C1E4A" },
  { name: "Electronics", emoji: "📺", query: "samsung tv", bg: "#EFF6FF", color: "#1E3A8A" },
  { name: "Appliances", emoji: "❄️", query: "ac", bg: "#F0FAFA", color: "#0C4A6E" },
  { name: "Grocery", emoji: "🛒", query: "dal", bg: "#F5F0E8", color: "#4A3520" },
];

export default function CategoryGrid() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }} className="cols-2-xs">
      {cats.map((cat, i) => (
        <button key={cat.name} onClick={() => router.push("/search?q=" + encodeURIComponent(cat.query))}
          onMouseEnter={() => setHovered(cat.name)} onMouseLeave={() => setHovered(null)}
          style={{ animationDelay: i * 25 + "ms", background: hovered === cat.name ? cat.bg : "#FFFFFF", border: "1px solid " + (hovered === cat.name ? cat.color + "40" : "#DDD4BE"), borderRadius: 9, padding: "13px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", transition: "all 0.15s ease", transform: hovered === cat.name ? "translateY(-2px)" : "none", boxShadow: hovered === cat.name ? "0 4px 12px rgba(30,18,8,0.08)" : "none" }}
          className="fade-up">
          <span style={{ fontSize: 22, lineHeight: 1 }}>{cat.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: hovered === cat.name ? cat.color : "#6B5B3E", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.01em" }}>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}