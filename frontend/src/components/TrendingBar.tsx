"use client";
import { useRouter } from "next/navigation";

const items = [
  { name: "Tomato", price: "42", unit: "kg", change: -12 },
  { name: "Gold 24K", price: "7,240", unit: "g", change: 1.2 },
  { name: "Petrol Delhi", price: "94.77", unit: "L", change: 0 },
  { name: "Onion", price: "28", unit: "kg", change: -5 },
  { name: "iPhone 16", price: "79,900", unit: "pc", change: -1 },
  { name: "Silver", price: "89,500", unit: "kg", change: 2.1 },
  { name: "Diesel Delhi", price: "87.67", unit: "L", change: 0 },
  { name: "RE Classic 350", price: "1,93,079", unit: "pc", change: 2 },
  { name: "Maruti Swift", price: "6,99,000", unit: "pc", change: 1 },
  { name: "CNG Delhi", price: "74.09", unit: "kg", change: -2 },
  { name: "Cashew W240", price: "850", unit: "kg", change: 2 },
  { name: "Mango Alphonso", price: "350", unit: "kg", change: 5 },
];

export default function TrendingBar() {
  const router = useRouter();
  const doubled = [...items, ...items];

  return (
    <div className="ticker-bar" style={{ marginTop: 52 }}>
      <div className="ticker-animate">
        {doubled.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push("/search?q=" + encodeURIComponent(item.name))}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 16px", background: "none", border: "none", cursor: "pointer", borderRight: "1px solid #2A2A2A", whiteSpace: "nowrap" }}
          >
            <span style={{ color: "#9CA3AF", fontSize: 11 }}>{item.name}</span>
            <span style={{ color: "#F0B429", fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>₹{item.price}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: item.change > 0 ? "#EF4444" : item.change < 0 ? "#00B386" : "#6B7280" }}>
              {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "—"}{item.change !== 0 ? Math.abs(item.change) + "%" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}