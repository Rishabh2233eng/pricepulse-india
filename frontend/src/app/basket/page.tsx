"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingBar from "@/components/TrendingBar";
import { ShieldCheck, TrendingUp, TrendingDown, Minus, ArrowRight, ShoppingBasket } from "lucide-react";
import Link from "next/link";

interface BasketItem {
  name: string;
  quantity: number;
  unit: string;
  pricePaid?: number;
}

interface ResultItem {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
  source: string;
  category: string;
  found: boolean;
}

const presets = [
  { label: "🥗 Weekly Vegetables", items: [{ name: "tomato", quantity: 2, unit: "kg" }, { name: "onion", quantity: 2, unit: "kg" }, { name: "potato", quantity: 3, unit: "kg" }, { name: "garlic", quantity: 0.25, unit: "kg" }, { name: "ginger", quantity: 0.25, unit: "kg" }] },
  { label: "🛒 Monthly Grocery", items: [{ name: "rice", quantity: 5, unit: "kg" }, { name: "dal", quantity: 2, unit: "kg" }, { name: "wheat atta", quantity: 5, unit: "kg" }, { name: "sugar", quantity: 1, unit: "kg" }, { name: "oil", quantity: 1, unit: "litre" }] },
  { label: "🥜 Dry Fruits Pack", items: [{ name: "cashew", quantity: 0.5, unit: "kg" }, { name: "almond", quantity: 0.5, unit: "kg" }, { name: "raisin", quantity: 0.25, unit: "kg" }] },
];

const catColors: Record<string, { bg: string; color: string }> = {
  Vegetable: { bg: "#DFF0E8", color: "#1E5C3A" },
  Fruit: { bg: "#FAF0D7", color: "#8B6914" },
  "Dry Fruit": { bg: "#FEF3C7", color: "#78350F" },
  Grocery: { bg: "#EDE8DE", color: "#4A3520" },
  Fuel: { bg: "#FAEBE9", color: "#9B2C1E" },
};

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>([
    { name: "", quantity: 1, unit: "kg", pricePaid: undefined },
  ]);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const addItem = () => setItems([...items, { name: "", quantity: 1, unit: "kg" }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof BasketItem, value: string | number) => {
    const updated = [...items];
    (updated[i] as any)[field] = value;
    setItems(updated);
  };

  const loadPreset = (preset: typeof presets[0]) => {
    setItems(preset.items.map(i => ({ ...i, pricePaid: undefined })));
    setResults(null);
    setChecked(false);
  };

  const handleCheck = async () => {
    const valid = items.filter(i => i.name.trim());
    if (valid.length === 0) return;
    setLoading(true);
    setChecked(false);
    try {
      const res = await fetch("/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: valid }),
      });
      const data = await res.json();
      setResults(data.items);
      const paid = valid.reduce((sum, i) => sum + (i.pricePaid || 0) * i.quantity, 0);
      setTotalPaid(paid);
      setChecked(true);
    } catch {}
    setLoading(false);
  };

  const handleWhatsApp = () => {
    if (!results) return;
    const lines = results.map(r => r.found ? `• ${r.name} (${r.quantity}${r.unit}): ₹${r.total.toLocaleString("en-IN")}` : `• ${r.name}: Not found`).join("\n");
    const totalMarket = results.reduce((s, r) => s + r.total, 0);
    const msg = `🛒 *PricePulse — Budget Basket*\n\n${lines}\n\n💰 *Total Market Price: ₹${totalMarket.toLocaleString("en-IN")}*\n\n_Check prices at pricepulse.vercel.app_`;
    window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
  };

  const totalMarket = results?.reduce((s, r) => s + r.total, 0) || 0;
  const saved = totalPaid > 0 ? totalPaid - totalMarket : 0;

  const inputStyle = {
    border: "1px solid #CFC8B4",
    borderRadius: 7,
    padding: "9px 12px",
    fontSize: 13,
    color: "#1A1208",
    background: "#FDFAF5",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
    width: "100%",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#EDE8DE" }}>
      <Navbar />
      <TrendingBar />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#9A8A6E", textDecoration: "none", fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to Markets
        </Link>

        {/* Header */}
        <div style={{ background: "#1E3A2F", borderRadius: 12, padding: "24px 28px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, background: "#4CAF7D", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShoppingBasket size={22} color="#1E3A2F" strokeWidth={2} />
            </div>
            <div>
              <h1 style={{ color: "#FAF7F2", fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 2 }}>Budget Basket</h1>
              <p style={{ color: "#6B8C7A", fontSize: 13 }}>Add items with quantity — we'll calculate the real market cost</p>
            </div>
          </div>

          {/* Presets */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            <span style={{ color: "#6B8C7A", fontSize: 11, fontWeight: 600, alignSelf: "center" }}>Quick load:</span>
            {presets.map((p) => (
              <button key={p.label} onClick={() => loadPreset(p)}
                style={{ fontSize: 11, padding: "5px 12px", border: "1px solid #2D4A3E", borderRadius: 20, background: "rgba(76,175,125,0.1)", color: "#4CAF7D", cursor: "pointer", fontWeight: 600, transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(76,175,125,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(76,175,125,0.1)"; }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }} className="sidebar-layout">

          {/* Left — Item Input */}
          <div>
            <div style={{ background: "#FDFAF5", border: "1px solid #CFC8B4", borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, color: "#1A1208" }}>Your Items</h2>
                <button onClick={addItem}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", background: "#1E5C3A", color: "#FAF7F2", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  <Plus size={13} strokeWidth={2.5} /> Add Item
                </button>
              </div>

              {/* Table Header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px 90px 32px", gap: 8, marginBottom: 8 }}>
                {["Product", "Qty", "Unit", "You Paid (₹)", ""].map((h) => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9A8A6E", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px 90px 32px", gap: 8, alignItems: "center" }}>
                    <input value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)}
                      placeholder="e.g. tomato, gold..." style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#2D7A4F")}
                      onBlur={e => (e.target.style.borderColor = "#CFC8B4")} />
                    <input type="number" value={item.quantity} min={0.1} step={0.1}
                      onChange={(e) => updateItem(i, "quantity", parseFloat(e.target.value) || 1)}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#2D7A4F")}
                      onBlur={e => (e.target.style.borderColor = "#CFC8B4")} />
                    <select value={item.unit} onChange={(e) => updateItem(i, "unit", e.target.value)}
                      style={{ ...inputStyle }}>
                      <option>kg</option>
                      <option>gram</option>
                      <option>litre</option>
                      <option>piece</option>
                      <option>dozen</option>
                      <option>pack</option>
                    </select>
                    <input type="number" value={item.pricePaid || ""} placeholder="optional"
                      onChange={(e) => updateItem(i, "pricePaid", parseFloat(e.target.value) || 0)}
                      style={{ ...inputStyle, fontFamily: "monospace" }}
                      onFocus={e => (e.target.style.borderColor = "#2D7A4F")}
                      onBlur={e => (e.target.style.borderColor = "#CFC8B4")} />
                    <button onClick={() => removeItem(i)}
                      style={{ background: items.length === 1 ? "#F5F1EA" : "#FAEBE9", border: "none", borderRadius: 6, padding: "7px", cursor: items.length === 1 ? "not-allowed" : "pointer", color: items.length === 1 ? "#CFC8B4" : "#C0392B", display: "flex", alignItems: "center", justifyContent: "center" }}
                      disabled={items.length === 1}>
                      <Trash2 size={13} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleCheck} disabled={loading || items.every(i => !i.name.trim())}
                style={{ width: "100%", marginTop: 16, padding: "12px", background: "#1E5C3A", color: "#FAF7F2", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "-0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: items.every(i => !i.name.trim()) ? 0.5 : 1, fontFamily: "var(--font-display)", transition: "all 0.15s" }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#2D7A4F"; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1E5C3A"}>
                {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Checking prices...</> : <><ShoppingBasket size={16} strokeWidth={2} /> Calculate Market Price</>}
              </button>
            </div>

            {/* Results */}
            {checked && results && (
              <div style={{ background: "#FDFAF5", border: "1px solid #CFC8B4", borderRadius: 12, overflow: "hidden" }} className="fade-in">
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #E6E0D4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h2 style={{ fontSize: 15, color: "#1A1208" }}>Price Breakdown</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleCheck}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#EDE8DE", border: "1px solid #CFC8B4", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#6B5B3E" }}>
                      <RefreshCw size={11} strokeWidth={2} /> Refresh
                    </button>
                    <button onClick={handleWhatsApp}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#25D366", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                      <Share2 size={11} strokeWidth={2.5} /> Share
                    </button>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F5F1EA" }}>
                      {["Product", "Qty", "Market Price", "Total", "Source"].map((h) => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#9A8A6E", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => {
                      const cat = catColors[r.category] || { bg: "#EDE8DE", color: "#4A3520" };
                      return (
                        <tr key={i} style={{ borderTop: "1px solid #F0EAE0" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#FAF7F2")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1208" }}>{r.name}</div>
                            <span style={{ background: cat.bg, color: cat.color, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "1px 6px", borderRadius: 3, display: "inline-block", marginTop: 2 }}>{r.category}</span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#3D3020" }}>{r.quantity} {r.unit}</td>
                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#1A1208", fontFamily: "monospace" }}>
                            {r.found ? "₹" + r.pricePerUnit.toLocaleString("en-IN") + "/" + r.unit : <span style={{ color: "#9A8A6E" }}>Not found</span>}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 800, color: r.found ? "#1E5C3A" : "#9A8A6E", fontFamily: "monospace" }}>
                            {r.found ? "₹" + r.total.toLocaleString("en-IN") : "—"}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 11, color: "#9A8A6E" }}>📍 {r.source}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#1E3A2F", borderTop: "2px solid #163020" }}>
                      <td colSpan={3} style={{ padding: "14px 16px", color: "#6B8C7A", fontSize: 12, fontWeight: 600 }}>Total Market Price</td>
                      <td style={{ padding: "14px 16px", fontSize: 20, fontWeight: 900, color: "#4CAF7D", fontFamily: "monospace", letterSpacing: "-0.025em" }}>₹{totalMarket.toLocaleString("en-IN")}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Summary */}
            {checked && results && (
              <div style={{ background: "#FDFAF5", border: "1px solid #CFC8B4", borderRadius: 12, padding: 20 }} className="fade-in">
                <h3 style={{ fontSize: 14, color: "#1A1208", marginBottom: 16 }}>Summary</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#EDE8DE", borderRadius: 8 }}>
                    <span style={{ fontSize: 12, color: "#6B5B3E", fontWeight: 500 }}>Market Total</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#1A1208", fontFamily: "monospace" }}>₹{totalMarket.toLocaleString("en-IN")}</span>
                  </div>
                  {totalPaid > 0 && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#EDE8DE", borderRadius: 8 }}>
                        <span style={{ fontSize: 12, color: "#6B5B3E", fontWeight: 500 }}>You Paid</span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#1A1208", fontFamily: "monospace" }}>₹{totalPaid.toLocaleString("en-IN")}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: saved >= 0 ? "#FAEBE9" : "#DFF0E8", borderRadius: 8, border: "1px solid " + (saved >= 0 ? "#E8B4AE" : "#A8D8BC") }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: saved >= 0 ? "#C0392B" : "#1E5C3A", display: "flex", alignItems: "center", gap: 4 }}>
                          <TrendingDown size={13} strokeWidth={2} />
                          {saved >= 0 ? "Overpaid by" : "Saved"}
                        </span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: saved >= 0 ? "#C0392B" : "#1E5C3A", fontFamily: "monospace" }}>
                          ₹{Math.abs(saved).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #E6E0D4" }}>
                    <span style={{ fontSize: 11, color: "#9A8A6E" }}>Items found</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1E5C3A" }}>{results.filter(r => r.found).length}/{results.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* How it works */}
            <div style={{ background: "#FDFAF5", border: "1px solid #CFC8B4", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, color: "#1A1208", marginBottom: 14 }}>How it works</h3>
              {[
                { n: "1", t: "Add items", d: "Add products with quantity you want to buy" },
                { n: "2", t: "Optional: Add price paid", d: "Enter what your local vendor charged you" },
                { n: "3", t: "Calculate", d: "We fetch real mandi/market prices for each item" },
                { n: "4", t: "See savings", d: "Compare your bill vs real market price" },
              ].map((s) => (
                <div key={s.n} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, background: "#1E5C3A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ color: "#FAF7F2", fontSize: 10, fontWeight: 800 }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1208", marginBottom: 1 }}>{s.t}</div>
                    <div style={{ fontSize: 11, color: "#9A8A6E", lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ background: "#1E3A2F", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4CAF7D", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>💡 Pro Tips</div>
              {["Buy vegetables on Tuesday/Wednesday — prices are lowest mid-week", "Gold is cheapest on Akshaya Tritiya and Dhanteras", "Buy fuel in morning — density is higher in cooler temperature"].map((t, i) => (
                <div key={i} style={{ fontSize: 11, color: "#6B8C7A", lineHeight: 1.6, paddingBottom: 8, marginBottom: 8, borderBottom: i < 2 ? "1px solid #1A3028" : "none" }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}