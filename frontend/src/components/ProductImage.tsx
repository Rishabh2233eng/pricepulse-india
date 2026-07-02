"use client";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  name: string;
  category: string;
}

const categoryEmojis: Record<string, string> = {
  Smartphone: "📱",
  Laptop: "💻",
  Car: "🚗",
  Bike: "🏍️",
  Vegetable: "🥦",
  Fruit: "🍎",
  "Dry Fruit": "🥜",
  Grocery: "🛒",
  Fuel: "⛽",
  Commodity: "🥇",
  Electronics: "📺",
  Appliance: "❄️",
  Medicine: "💊",
  "Real Estate": "🏠",
};

export default function ProductImage({ name, category }: ProductImageProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(false);

    fetch("/api/image?q=" + encodeURIComponent(name))
      .then((r) => r.json())
      .then((data) => {
        if (data.url) setImgUrl(data.url);
        else setError(true);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [name]);

  const emoji = categoryEmojis[category] || "📦";

  if (loading) {
    return (
      <div style={{ width: "100%", height: 200, background: "#1A1A24", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #6C63FF", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (error || !imgUrl) {
    return (
      <div style={{ width: "100%", height: 200, background: "#1A1A24", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 48 }}>{emoji}</span>
        <span style={{ color: "#6B6B8A", fontSize: 12 }}>{name}</span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 200, borderRadius: 12, overflow: "hidden", background: "#1A1A24", position: "relative" }}>
      <img
        src={imgUrl}
        alt={name}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
        onError={() => setError(true)}
      />
    </div>
  );
}