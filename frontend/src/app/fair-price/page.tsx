"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
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
    fair: { color: "text-[#00D4AA]", bg: "border-[#00D4AA]/30 bg-[#00D4AA]/5", icon: <ShieldCheck className="w-8 h-8 text-[#00D4AA]" />, label: "✅ Fair Price" },
    overcharged: { color: "text-[#FF6B6B]", bg: "border-[#FF6B6B]/30 bg-[#FF6B6B]/5", icon: <AlertTriangle className="w-8 h-8 text-[#FF6B6B]" />, label: "🚨 You Were Overcharged!" },
    "great deal": { color: "text-[#6C63FF]", bg: "border-[#6C63FF]/30 bg-[#6C63FF]/5", icon: <ThumbsUp className="w-8 h-8 text-[#6C63FF]" />, label: "🎉 Great Deal!" },
  };

  const v = result ? (verdictConfig[result.verdict] || verdictConfig["fair"]) : null;

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B8A] hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-[#FF6B6B]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Am I Being Cheated?</h1>
          <p className="text-[#6B6B8A]">Enter what you paid — AI tells you if it was fair</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-6">
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="text-[#6B6B8A] text-sm mb-2 block">What did you buy?</label>
              <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Tomato, Onion, iPhone 15, Petrol..."
                className="w-full bg-[#0A0A0F] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white placeholder-[#6B6B8A] focus:outline-none focus:border-[#6C63FF] transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#6B6B8A] text-sm mb-2 block">Price you paid (₹)</label>
                <input type="number" value={pricePaid} onChange={(e) => setPricePaid(e.target.value)} placeholder="e.g. 80"
                  className="w-full bg-[#0A0A0F] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white placeholder-[#6B6B8A] focus:outline-none focus:border-[#6C63FF] transition-all font-mono-price" />
              </div>
              <div>
                <label className="text-[#6B6B8A] text-sm mb-2 block">Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-all">
                  <option value="kg">per kg</option>
                  <option value="litre">per litre</option>
                  <option value="gram">per gram</option>
                  <option value="piece">per piece</option>
                  <option value="dozen">per dozen</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading || !product || !pricePaid} className="w-full py-3.5 btn-primary text-sm flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : "Check Now 🔍"}
            </button>
          </form>
        </div>

        {result && v && (
          <div className={"border rounded-2xl p-6 space-y-5 " + v.bg}>
            <div className="flex items-center gap-4">
              {v.icon}
              <div>
                <h2 className={"text-2xl font-bold " + v.color}>{v.label}</h2>
                <p className="text-[#9090B0] text-sm mt-1">{result.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "You Paid", value: "₹" + pricePaid, color: "text-white" },
                { label: "Market Price", value: "₹" + result.marketPrice, color: "text-[#00D4AA]" },
                { label: "Difference", value: (result.percentageDiff > 0 ? "+" : "") + result.percentageDiff + "%", color: v.color },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[#6B6B8A] text-xs mb-1">{stat.label}</p>
                  <p className={"font-mono-price font-bold text-lg " + stat.color}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[#6B6B8A] text-xs mb-1 font-bold">💡 Buying Tip</p>
              <p className="text-white text-sm">{result.tip}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[{ product: "Tomato", price: "80", unit: "kg" }, { product: "Petrol", price: "100", unit: "litre" }, { product: "iPhone 15", price: "90000", unit: "piece" }].map((ex) => (
            <button key={ex.product} onClick={() => { setProduct(ex.product); setPricePaid(ex.price); setUnit(ex.unit); }}
              className="glass hover:border-[#6C63FF]/30 rounded-xl p-3 text-left transition-all">
              <p className="text-white text-sm font-bold">{ex.product}</p>
              <p className="text-[#6B6B8A] text-xs font-mono-price">₹{ex.price} / {ex.unit}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}