"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingBar from "@/components/TrendingBar";
import { getWatchlist, removeFromWatchlist, setTargetPrice, WatchItem } from "@/lib/watchlist";
import { Trash2, Bell, BellOff, ArrowLeft, TrendingUp, TrendingDown, BookMarked } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchItem[]>([]);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState("");

  useEffect(() => { setItems(getWatchlist()); }, []);

  const handleRemove = (name: string) => setItems(removeFromWatchlist(name));

  const handleSetTarget = (name: string) => {
    if (!targetInput) return;
    setItems(setTargetPrice(name, parseFloat(targetInput)));
    setEditingTarget(null);
    setTargetInput("");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#F7F6F3" }}>
      <Navbar />
      <TrendingBar />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px" }}>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#888", textDecoration: "none", fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
          <ArrowLeft size={14} strokeWidth={2} /> Back to Markets
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, background: "#059669", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookMarked size={18} color="#fff" strokeWidth={2} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>My Watchlist</h1>
            <p style={{ fontSize: 12, color: "#888", marginTop: 1 }}>Track prices and set alerts for products you care about</p>
          </div>
          <span style={{ marginLeft: "auto", background: "#ECFDF5", color: "#059669", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: "1px solid #A7F3D0" }}>
            {items.length} items
          </span>
        </div>

        {items.length === 0 ? (
          <div style={{ background: "#fff", border: "1.5px dashed #E8E7E3", borderRadius: 12, padding: "60px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 6, letterSpacing: "-0.02em" }}>Your watchlist is empty</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Add products from search results to track their prices</p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#059669", color: "#fff", textDecoration: "none", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
              Browse Products →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => {
              const currentPrice = parseFloat(item.price.replace(/,/g, ""));
              const isBelowTarget = item.targetPrice && currentPrice <= item.targetPrice;

              return (
                <div key={item.name} style={{ background: "#fff", border: "1px solid #E8E7E3", borderRadius: 12, padding: "20px 22px", transition: "box-shadow 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ background: "#F2F1EE", color: "#555", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 4 }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>Added {new Date(item.addedAt).toLocaleDateString("en-IN")}</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>{item.name}</h3>
                    </div>
                    <button onClick={() => handleRemove(item.name)}
                      style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: "#DC2626", transition: "all 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#DC2626"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLElement).style.color = "#DC2626"; }}>
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #F2F1EE" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 2 }}>Current Price</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#111", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                        ₹{currentPrice.toLocaleString("en-IN")}
                        <span style={{ fontSize: 12, color: "#888", fontFamily: "inherit", fontWeight: 500 }}> / {item.unit}</span>
                      </div>
                    </div>

                    <div>
                      {item.targetPrice ? (
                        <div style={{ background: isBelowTarget ? "#ECFDF5" : "#FFFBEB", border: "1px solid " + (isBelowTarget ? "#A7F3D0" : "#FDE68A"), borderRadius: 8, padding: "10px 14px", textAlign: "right" }}>
                          <div style={{ fontSize: 10, color: "#888", marginBottom: 2, fontWeight: 500 }}>Price Alert</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: isBelowTarget ? "#059669" : "#D97706", fontFamily: "monospace" }}>
                            ₹{item.targetPrice.toLocaleString("en-IN")}
                          </div>
                          {isBelowTarget && <div style={{ fontSize: 10, color: "#059669", fontWeight: 700, marginTop: 2 }}>🎉 Target reached!</div>}
                        </div>
                      ) : editingTarget === item.name ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <input type="number" value={targetInput} onChange={(e) => setTargetInput(e.target.value)}
                            placeholder="Target ₹" autoFocus
                            style={{ width: 110, border: "1.5px solid #059669", borderRadius: 7, padding: "8px 10px", fontSize: 13, outline: "none", fontFamily: "monospace", color: "#111" }} />
                          <button onClick={() => handleSetTarget(item.name)}
                            style={{ padding: "8px 14px", background: "#059669", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            Set
                          </button>
                          <button onClick={() => setEditingTarget(null)}
                            style={{ padding: "8px 10px", background: "#F2F1EE", color: "#666", border: "none", borderRadius: 7, fontSize: 12, cursor: "pointer" }}>
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setEditingTarget(item.name)}
                          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#F7F6F3", border: "1px solid #E8E7E3", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#555", transition: "all 0.15s" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#059669"; (e.currentTarget as HTMLElement).style.color = "#059669"; (e.currentTarget as HTMLElement).style.background = "#ECFDF5"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E7E3"; (e.currentTarget as HTMLElement).style.color = "#555"; (e.currentTarget as HTMLElement).style.background = "#F7F6F3"; }}>
                          <Bell size={13} strokeWidth={2} /> Set Price Alert
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}