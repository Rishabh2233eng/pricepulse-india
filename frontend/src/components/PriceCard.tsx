"use client";
import { TrendingUp, TrendingDown, Minus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PriceCardProps {
  name: string; price: string; unit: string; change: number;
  source: string; category: string; description?: string; index?: number;
}

const catStyles: Record<string, { bg: string; color: string }> = {
  Vegetable: { bg: "#E8F5EE", color: "#1E5C3A" },
  Fruit: { bg: "#FDF6E3", color: "#8B6914" },
  "Dry Fruit": { bg: "#FEF3C7", color: "#78350F" },
  Fuel: { bg: "#FDEDEB", color: "#9B2C1E" },
  Commodity: { bg: "#FDF6E3", color: "#8B6914" },
  Smartphone: { bg: "#EFF6FF", color: "#1E3A8A" },
  Laptop: { bg: "#F5F3FF", color: "#4C1D95" },
  Car: { bg: "#FFF0F6", color: "#7C1E4A" },
  Bike: { bg: "#FFF4EC", color: "#7C2D0E" },
  Electronics: { bg: "#EFF6FF", color: "#1E3A8A" },
  Appliance: { bg: "#F0FAFA", color: "#0C4A6E" },
  Medicine: { bg: "#E8F5EE", color: "#1E5C3A" },
  Grocery: { bg: "#F5F0E8", color: "#4A3520" },
};

export default function PriceCard({ name, price, unit, change, source, category, description, index = 0 }: PriceCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const router = useRouter();
  const [sharing, setSharing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cat = catStyles[category] || { bg: "#F5F0E8", color: "#4A3520" };

  const handleClick = () => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push("/product/" + slug + "?price=" + price + "&unit=" + unit + "&change=" + change + "&source=" + source + "&category=" + category + "&description=" + encodeURIComponent(description || ""));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSharing(true);
    try {
      const res = await fetch("/api/whatsapp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, price, unit, change, category, source }) });
      const data = await res.json();
      window.open(data.url, "_blank");
    } catch {}
    setSharing(false);
  };

  return (
    <div onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: index * 45 + "ms", background: hovered ? "#FFFEFA" : "#FFFFFF", border: "1px solid " + (hovered ? "#2D7A4F" : "#DDD4BE"), borderRadius: 10, padding: 18, cursor: "pointer", transition: "all 0.18s ease", transform: hovered ? "translateY(-3px)" : "none", boxShadow: hovered ? "0 8px 28px rgba(30,92,58,0.13)" : "0 1px 4px rgba(30,18,8,0.04)" }}
      className="fade-up">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ background: cat.bg, color: cat.color, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", padding: "3px 8px", borderRadius: 4 }}>{category}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, background: isUp ? "#FDEDEB" : isDown ? "#E8F5EE" : "#F5F0E8", color: isUp ? "#C0392B" : isDown ? "#1E5C3A" : "#9A8A6E", padding: "2px 7px", borderRadius: 4 }}>
          {isUp ? <TrendingUp size={10} strokeWidth={2.5} /> : isDown ? <TrendingDown size={10} strokeWidth={2.5} /> : <Minus size={10} strokeWidth={2.5} />}
          {change !== 0 ? Math.abs(change) + "%" : "stable"}
        </div>
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1208", marginBottom: 3, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{name}</h3>
      {description && <p style={{ fontSize: 11, color: "#9A8A6E", marginBottom: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{description}</p>}
      <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 14 }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 22, fontWeight: 700, color: "#1A1208", letterSpacing: "-0.025em" }}>₹{Number(price).toLocaleString("en-IN")}</span>
        <span style={{ color: "#9A8A6E", fontSize: 11, fontWeight: 500 }}>/ {unit}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #F0EAE0" }}>
        <span style={{ color: "#9A8A6E", fontSize: 11, fontWeight: 500 }}>📍 {source}</span>
        <button onClick={handleShare}
          style={{ display: "flex", alignItems: "center", gap: 4, background: "#25D366", border: "none", borderRadius: 5, padding: "3px 9px", cursor: "pointer", fontSize: 10, fontWeight: 700, color: "#fff", opacity: sharing ? 0.7 : 1 }}>
          <Share2 size={9} strokeWidth={2.5} />{sharing ? "..." : "Share"}
        </button>
      </div>
    </div>
  );
}