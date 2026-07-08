"use client";
import { useRouter } from "next/navigation";

const items = [
  { name: "Tomato", price: "42", change: -12 },
  { name: "Gold 24K", price: "7,240", change: 1.2 },
  { name: "Petrol Delhi", price: "94.77", change: 0 },
  { name: "Onion", price: "28", change: -5 },
  { name: "iPhone 16", price: "79,900", change: -1 },
  { name: "Silver", price: "89,500", change: 2.1 },
  { name: "Diesel Delhi", price: "87.67", change: 0 },
  { name: "RE Classic 350", price: "1,93,079", change: 2 },
  { name: "Maruti Swift", price: "6,99,000", change: 1 },
  { name: "CNG Delhi", price: "74.09", change: -2 },
  { name: "Cashew W240", price: "850", change: 2 },
  { name: "Mango Alphonso", price: "350", change: 5 },
];

export default function TrendingBar() {
  const router = useRouter();
  return (
    <div style={{ background: "#172E22", borderBottom: "1px solid #163020", overflow: "hidden", marginTop: 54 }}>
      <div className="ticker-animate">
        {[...items, ...items].map((item, i) => (
          <button key={i} onClick={() => router.push("/search?q=" + encodeURIComponent(item.name))}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 18px", background: "none", border: "none", borderRight: "1px solid #1E3A2F", cursor: "pointer", whiteSpace: "nowrap" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1E3A2F")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <span style={{ color: "#9A8A6E", fontSize: 11, fontWeight: 500 }}>{item.name}</span>
            <span style={{ color: "#C8A84B", fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>₹{item.price}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: item.change > 0 ? "#E07070" : item.change < 0 ? "#4CAF7D" : "#6B5B3E" }}>
              {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "—"}{item.change !== 0 ? Math.abs(item.change) + "%" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}