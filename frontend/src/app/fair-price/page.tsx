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
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict === "fair") return "text-emerald-400";
    if (verdict === "overcharged") return "text-red-400";
    return "text-blue-400";
  };

  const getVerdictBg = (verdict: string) => {
    if (verdict === "fair") return "bg-emerald-500/10 border-emerald-500/20";
    if (verdict === "overcharged") return "bg-red-500/10 border-red-500/20";
    return "bg-blue-500/10 border-blue-500/20";
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === "fair") return <ShieldCheck className="w-8 h-8 text-emerald-400" />;
    if (verdict === "overcharged") return <AlertTriangle className="w-8 h-8 text-red-400" />;
    return <ThumbsUp className="w-8 h-8 text-blue-400" />;
  };

  const getVerdictEmoji = (verdict: string) => {
    if (verdict === "fair") return "✅ Fair Price";
    if (verdict === "overcharged") return "🚨 You Were Overcharged!";
    return "🎉 Great Deal!";
  };

  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-4">
            🛡️ AI Powered Price Check
          </span>
          <h1 className="text-4xl font-bold mb-3">Am I Being Cheated?</h1>
          <p className="text-gray-400 text-base">
            Enter what you paid and we will tell you if it was fair — powered by AI
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">What did you buy?</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Tomato, Onion, iPhone 15, Petrol..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Price you paid (₹)</label>
                <input
                  type="number"
                  value={pricePaid}
                  onChange={(e) => setPricePaid(e.target.value)}
                  placeholder="e.g. 80"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-[#080B0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                >
                  <option value="kg">per kg</option>
                  <option value="litre">per litre</option>
                  <option value="gram">per gram</option>
                  <option value="piece">per piece</option>
                  <option value="dozen">per dozen</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !product || !pricePaid}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Checking with AI...
                </span>
              ) : "Check Price 🔍"}
            </button>
          </form>
        </div>

        {result && (
          <div className={"border rounded-2xl p-6 space-y-5 " + getVerdictBg(result.verdict)}>
            <div className="flex items-center gap-4">
              {getVerdictIcon(result.verdict)}
              <div>
                <h2 className={"text-2xl font-bold " + getVerdictColor(result.verdict)}>
                  {getVerdictEmoji(result.verdict)}
                </h2>
                <p className="text-gray-300 text-sm mt-1">{result.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-xs mb-1">You Paid</p>
                <p className="text-white font-bold text-lg">{"₹" + pricePaid}</p>
                <p className="text-gray-500 text-xs">{"per " + unit}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-xs mb-1">Market Price</p>
                <p className="text-emerald-400 font-bold text-lg">{"₹" + result.marketPrice}</p>
                <p className="text-gray-500 text-xs">{"per " + unit}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-xs mb-1">Difference</p>
                <p className={"font-bold text-lg " + getVerdictColor(result.verdict)}>
                  {result.percentageDiff > 0 ? "+" : ""}{result.percentageDiff}%
                </p>
                <p className="text-gray-500 text-xs">vs market</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">💡 Buying Tip</p>
              <p className="text-white text-sm">{result.tip}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { product: "Tomato", price: "80", unit: "kg" },
            { product: "Petrol", price: "100", unit: "litre" },
            { product: "iPhone 15", price: "90000", unit: "piece" },
          ].map((ex) => (
            <button
              key={ex.product}
              onClick={() => { setProduct(ex.product); setPricePaid(ex.price); setUnit(ex.unit); }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-left transition-all"
            >
              <p className="text-white text-sm font-medium">{ex.product}</p>
              <p className="text-gray-500 text-xs">{"₹" + ex.price + " / " + ex.unit}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}