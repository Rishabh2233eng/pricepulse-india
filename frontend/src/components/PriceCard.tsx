"use client";
import { TrendingUp, TrendingDown, Minus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PriceCardProps {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
  description?: string;
  index?: number;
}

const categoryColors: Record<string, string> = {
  Vegetable: "#DCFCE7", Fruit: "#FEF9C3", "Dry Fruit": "#FEF3C7",
  Fuel: "#FEE2E2", Commodity: "#FEF9C3", Smartphone: "#DBEAFE",
  Laptop: "#EDE9FE", Car: "#FCE7F3", Bike: "#FFEDD5",
  Electronics: "#DBEAFE", Appliance: "#E0F2FE", Medicine: "#DCFCE7",
  Grocery: "#F3F4F6", "Real Estate": "#FEE2E2",
};

const categoryTextColors: Record<string, string> = {
  Vegetable: "#166534", Fruit: "#854D0E", "Dry Fruit": "#92400E",
  Fuel: "#991B1B", Commodity: "#854D0E", Smartphone: "#1E40AF",
  Laptop: "#5B21B6", Car: "#9D174D", Bike: "#9A3412",
  Electronics: "#1E40AF", Appliance: "#075985", Medicine: "#166534",
  Grocery: "#374151", "Real Estate": "#991B1B",
};

export default function PriceCard({ name, price, unit, change, source, category, description, index = 0 }: PriceCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const router = useRouter();
  const [sharing, setSharing] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push("/product/" + slug + "?price=" + price + "&unit=" + unit + "&change=" + change + "&source=" + source + "&category=" + category + "&description=" + encodeURIComponent(description || ""));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSharing(true);
    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, unit, change, category, source }),
      });
      const data = await res.json();
      window.open(data.url, "_blank");
    } catch {}
    setSharing(false);
  };

  const bgColor = categoryColors[category] || "#F3F4F6";
  const textColor = categoryTextColors[category] || "#374151";

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: index * 50 + "ms",
        background: "#fff",
        border: "1px solid " + (hovered ? "#00B386" : "#E5E5E0"),
        borderRadius: 8,
        padding: 16,
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 4px 16px rgba(0,179,134,0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
      className="fade-up"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ background: bgColor, color: textColor, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "2px 8px", borderRadius: 4 }}>
          {category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: isUp ? "#EF4444" : isDown ? "#00B386" : "#9CA3AF" }}>
          {isUp ? <TrendingUp size={11} /> : isDown ? <TrendingDown size={11} /> : <Minus size={11} />}
          {change !== 0 ? Math.abs(change) + "%" : "stable"}
        </div>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", marginBottom: 4, lineHeight: 1.3 }}>{name}</h3>
      {description && <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{description}</p>}

      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 20, fontWeight: 700, color: "#1C1C1C" }}>
          ₹{Number(price).toLocaleString("en-IN")}
        </span>
        <span style={{ color: "#9CA3AF", fontSize: 11 }}>/ {unit}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #F0F0EB" }}>
        <span style={{ color: "#9CA3AF", fontSize: 11 }}>📍 {source}</span>
        <button
          onClick={handleShare}
          style={{ display: "flex", alignItems: "center", gap: 4, background: "#25D366", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 700, color: "#fff", opacity: sharing ? 0.7 : 1 }}
        >
          <Share2 size={9} />
          {sharing ? "..." : "WhatsApp"}
        </button>
      </div>
    </div>
  );
}