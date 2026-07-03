"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingBar from "@/components/TrendingBar";
import { ShieldCheck, AlertTriangle, ThumbsUp, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FairPricePage() {
  const [product, setProduct] = useState("");
  const [pricePaid, setPricePaid] = useState("");
  const [unit, setUnit] = useState("kg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !pricePaid) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/fair-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, pricePaid: parseFloat(pricePaid), unit }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch { setResult(null); }
    finally { setLoading(false); }
  };

  const verdictConfig: Record<string, any> = {
    fair: { color: "#00B386", bg: "#DCFCE7", border: "#86EFAC", icon: <ShieldCheck size={28} color="#00B386" />, label: "✅ Fair Price" },
    overcharged: { color: "#EF4444", bg: "#FEE2E2", border: "#FCA5A5", icon: <AlertTriangle size={28} color="#EF4444" />, label: "🚨 You Were Overcharged!" },
    "great deal": { color: "#F0B429", bg: "#FEF9C3", border: "#FDE047", icon: <ThumbsUp size={28} color="#F0B429" />, label: "🎉 Great Deal!" },
  };

  const v = result ? (verdictConfig[result.verdict] || verdictConfig["fair"]) : null;

  const inputStyle = { width: "100%", border: "1.5px solid #E5E5E0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#1C1C1C", outline: "none", background: "#fff", transition: "border-color 0.15s" };

  return (
    <main style={{ minHeight: "100vh", background: "#F5F5F0" }}>
      <Navbar />
      <TrendingBar />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#9CA3AF", textDecoration: "none", fontSize: 13, marginBottom: 20 }}>
          <ArrowLeft size={14} /> Back to Markets
        </Link>

        <div style={{ background: "#EF4444", borderRadius: 10, padding: "24px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldCheck size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Am I Being Cheated?</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Enter what you paid — AI tells you if it was fair against real Indian market prices</p>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, padding: 24, marginBottom: 16 }}>
          <form onSubmit={handleCheck}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B6B6B", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>What did you buy?</label>
              <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Tomato, Onion, iPhone 15, Petrol..." style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#00B386")} onBlur={e => (e.target.style.borderColor = "#E5E5E0")} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B6B6B", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Price you paid (₹)</label>
                <input type="number" value={pricePaid} onChange={(e) => setPricePaid(e.target.value)} placeholder="e.g. 80" style={{ ...inputStyle, fontFamily: "monospace" }}
                  onFocus={e => (e.target.style.borderColor = "#00B386")} onBlur={e => (e.target.style.borderColor = "#E5E5E0")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B6B6B", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ ...inputStyle }}>
                  <option value="kg">per kg</option>
                  <option value="litre">per litre</option>
                  <option value="gram">per gram</option>
                  <option value="piece">per piece</option>
                  <option value="dozen">per dozen</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading || !product || !pricePaid}
              style={{ width: "100%", padding: "12px", background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: loading || !product || !pricePaid ? 0.5 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Checking...</> : "Check Price 🔍"}
            </button>
          </form>
        </div>

        {/* Quick examples */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
          {[{ product: "Tomato", price: "80", unit: "kg" }, { product: "Petrol", price: "100", unit: "litre" }, { product: "iPhone 15", price: "90000", unit: "piece" }].map((ex) => (
            <button key={ex.product} onClick={() => { setProduct(ex.product); setPricePaid(ex.price); setUnit(ex.unit); }}
              style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 8, padding: "10px 12px", textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EF4444"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E5E0"; }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1C" }}>{ex.product}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace" }}>₹{ex.price} / {ex.unit}</div>
            </button>
          ))}
        </div>

        {result && v && (
          <div style={{ border: "1.5px solid " + v.border, borderRadius: 10, padding: 20, background: v.bg }} className="fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {v.icon}
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: v.color }}>{v.label}</div>
                <div style={{ fontSize: 13, color: "#374151", marginTop: 2 }}>{result.message}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "You Paid", value: "₹" + pricePaid, color: "#1C1C1C" },
                { label: "Market Price", value: "₹" + result.marketPrice, color: "#00B386" },
                { label: "Difference", value: (result.percentageDiff > 0 ? "+" : "") + result.percentageDiff + "%", color: v.color },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 8, padding: "12px", textAlign: "center", border: "1px solid #E5E5E0" }}>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: 12, border: "1px solid #E5E5E0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>💡 Buying Tip</div>
              <div style={{ fontSize: 13, color: "#1C1C1C" }}>{result.tip}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}