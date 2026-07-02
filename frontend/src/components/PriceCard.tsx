"use client";
import { TrendingUp, TrendingDown, Minus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface PriceCardProps {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
  description?: string;
  index?: number;
  showImage?: boolean;
}

const categoryEmojis: Record<string, string> = {
  Smartphone: "📱", Laptop: "💻", Car: "🚗", Bike: "🏍️",
  Vegetable: "🥦", Fruit: "🍎", "Dry Fruit": "🥜", Grocery: "🛒",
  Fuel: "⛽", Commodity: "🥇", Electronics: "📺", Appliance: "❄️",
  Medicine: "💊", "Real Estate": "🏠",
};

export default function PriceCard({ name, price, unit, change, source, category, description, index = 0, showImage = false }: PriceCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!showImage) return;
    fetch("/api/image?q=" + encodeURIComponent(name))
      .then((r) => r.json())
      .then((data) => { if (data.url) setImgUrl(data.url); })
      .catch(() => {});
  }, [name, showImage]);

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

  const emoji = categoryEmojis[category] || "📦";

  return (
    <div
      onClick={handleClick}
      style={{
        animationDelay: index * 60 + "ms",
        background: "#12121A",
        border: "1px solid #2A2A3A",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      className="fade-up price-card group"
    >
      {/* Image or Emoji */}
      {showImage && imgUrl ? (
        <div style={{ width: "100%", height: 140, borderRadius: 10, overflow: "hidden", background: "#1A1A24", marginBottom: 16 }}>
          <img src={imgUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      ) : (
        <div style={{ fontSize: 32, marginBottom: 12 }}>{emoji}</div>
      )}

      {/* Category + Change */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span className="tag">{category}</span>
        <div className={isUp ? "tag-red" : isDown ? "tag-green" : ""} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: isUp ? "rgba(255,107,107,0.1)" : isDown ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.05)", color: isUp ? "#FF6B6B" : isDown ? "#00D4AA" : "#6B6B8A", border: isUp ? "1px solid rgba(255,107,107,0.3)" : isDown ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(255,255,255,0.1)" }}>
          {isUp ? <TrendingUp size={10} /> : isDown ? <TrendingDown size={10} /> : <Minus size={10} />}
          {change !== 0 ? Math.abs(change) + "%" : "stable"}
        </div>
      </div>

      {/* Name */}
      <h3 style={{ color: "#F0F0FF", fontWeight: 600, fontSize: 15, marginBottom: 4, lineHeight: 1.3 }}>{name}</h3>
      {description && <p style={{ color: "#6B6B8A", fontSize: 12, marginBottom: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{description}</p>}

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 22, fontWeight: 700, color: "#fff" }}>
          ₹{Number(price).toLocaleString("en-IN")}
        </span>
        <span style={{ color: "#6B6B8A", fontSize: 12 }}>/ {unit}</span>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #2A2A3A" }}>
        <span style={{ color: "#6B6B8A", fontSize: 12 }}>📍 {source}</span>
        <button
          onClick={handleShare}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "#25D366", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#fff" }}
        >
          <Share2 size={10} />
          {sharing ? "..." : "WhatsApp"}
        </button>
      </div>
    </div>
  );
}