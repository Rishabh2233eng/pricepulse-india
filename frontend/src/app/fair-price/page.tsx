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
    if (verdict === "fair") return "text-[#0F5C5C]";
    if (verdict === "overcharged") return "text-[#B33A2E]";
    return "text-[#0F5C5C]";
  };
  const getVerdictBg = (verdict: string) => {
    if (verdict === "fair") return "bg-[#0F5C5C]/10 border-[#0F5C5C]";
    if (verdict === "overcharged") return "bg-[#B33A2E]/10 border-[#B33A2E]";
    return "bg-[#E8871E]/10 border-[#E8871E]";
  };
  const getVerdictIcon = (verdict: string) => {
    if (verdict === "fair") return <ShieldCheck className="w-8 h-8 text-[#0F5C5C]" />;
    if (verdict === "overcharged") return <AlertTriangle className="w-8 h-8 text-[#B33A2E]" />;
    return <ThumbsUp className="w-8 h-8 text-[#E8871E]" />;
  };
  const getVerdictEmoji = (verdict: string) => {
    if (verdict === "fair") return "✅ Fair Price";
    if (verdict === "overcharged") return "🚨 You Were Overcharged!";
    return "🎉 Great Deal!";
  };

  return (
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6B6357] hover:text-[#1C1B19] text-sm mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#B33A2E] border border-[#B33A2E] px-3 py-1.5 rounded-sm mb-4 uppercase tracking-wide">
            🛡️ AI Powered Price Check
          </span>
          <h1 className="font-display text-4xl mb-3">Am I Being Cheated?</h1>
          <p className="text-[#6B6357] text-base">
            Enter what you paid and we will tell you if it was fair — powered by AI
          </p>
        </div>

        <div className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-6 mb-6 card-shadow">
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="text-[#1C1B19] text-sm font-bold mb-2 block">What did you buy?</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Tomato, Onion, iPhone 15, Petrol..."
                className="w-full bg-[#F0E9D8] border-2 border-[#1C1B19] rounded-sm px-4 py-3 text-[#1C1B19] placeholder-[#6B6357] focus:outline-none focus:bg-white transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#1C1B19] text-sm font-bold mb-2 block">Price you paid (₹)</label>
                <input
                  type="number"
                  value={pricePaid}
                  onChange={(e) => setPricePaid(e.target.value)}
                  placeholder="e.g. 80"
                  className="w-full bg-[#F0E9D8] border-2 border-[#1C1B19] rounded-sm px-4 py-3 text-[#1C1B19] placeholder-[#6B6357] focus:outline-none focus:bg-white transition-all font-mono-price"
                />
              </div>
              <div>
                <label className="text-[#1C1B19] text-sm font-bold mb-2 block">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-[#F0E9D8] border-2 border-[#1C1B19] rounded-sm px-4 py-3 text-[#1C1B19] focus:outline-none focus:bg-white transition-all"
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
              className="w-full py-3.5 bg-[#E8871E] hover:bg-[#C56F12] disabled:opacity-40 disabled:cursor-not-allowed text-[#1C1B19] font-bold rounded-sm transition-all border-2 border-[#1C1B19]"
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
          <div className={"border-2 rounded-sm p-6 space-y-5 card-shadow " + getVerdictBg(result.verdict)}>
            <div className="flex items-center gap-4">
              {getVerdictIcon(result.verdict)}
              <div>
                <h2 className={"font-display text-2xl " + getVerdictColor(result.verdict)}>
                  {getVerdictEmoji(result.verdict)}
                </h2>
                <p className="text-[#1C1B19] text-sm mt-1">{result.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FBF8F1] border border-[#1C1B19]/20 rounded-sm p-4 text-center">
                <p className="text-[#6B6357] text-xs mb-1">You Paid</p>
                <p className="font-mono-price text-[#1C1B19] font-bold text-lg">₹{pricePaid}</p>
                <p className="text-[#6B6357] text-xs">per {unit}</p>
              </div>
              <div className="bg-[#FBF8F1] border border-[#1C1B19]/20 rounded-sm p-4 text-center">
                <p className="text-[#6B6357] text-xs mb-1">Market Price</p>
                <p className="font-mono-price text-[#0F5C5C] font-bold text-lg">₹{result.marketPrice}</p>
                <p className="text-[#6B6357] text-xs">per {unit}</p>
              </div>
              <div className="bg-[#FBF8F1] border border-[#1C1B19]/20 rounded-sm p-4 text-center">
                <p className="text-[#6B6357] text-xs mb-1">Difference</p>
                <p className={"font-mono-price font-bold text-lg " + getVerdictColor(result.verdict)}>
                  {result.percentageDiff > 0 ? "+" : ""}{result.percentageDiff}%
                </p>
                <p className="text-[#6B6357] text-xs">vs market</p>
              </div>
            </div>

            <div className="bg-[#FBF8F1] border border-[#1C1B19]/20 rounded-sm p-4">
              <p className="text-[#6B6357] text-xs mb-1 font-bold">💡 Buying Tip</p>
              <p className="text-[#1C1B19] text-sm">{result.tip}</p>
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
              className="bg-[#FBF8F1] hover:bg-[#E8871E] border-2 border-[#1C1B19] rounded-sm p-3 text-left transition-all card-shadow card-shadow-hover"
            >
              <p className="text-[#1C1B19] text-sm font-bold font-display">{ex.product}</p>
              <p className="text-[#6B6357] text-xs font-mono-price">₹{ex.price} / {ex.unit}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}