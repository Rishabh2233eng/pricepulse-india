"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceCard from "@/components/PriceCard";
import SearchBar from "@/components/SearchBar";
import { Loader2, Sparkles, Tag, TrendingUp, Lightbulb } from "lucide-react";

interface Price { name: string; price: string; unit: string; change: number; source: string; category: string; description: string; }
interface AiResult { interpreted: string; priceRange: string; suggestion: string; }

function SearchResults() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const aiRaw = searchParams.get("ai") || "";
    setQuery(q);
    if (aiRaw) { try { setAiResult(JSON.parse(decodeURIComponent(aiRaw))); } catch {} }
    if (!q) { setLoading(false); return; }
    setLoading(true);
    fetch("/api/prices?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then((data) => { setResults(data.prices || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <div className="mb-8"><SearchBar /></div>

        {aiResult && aiResult.interpreted && (
          <div className="glass rounded-2xl p-5 mb-6 border border-[#6C63FF]/20">
            <div className="flex items-center gap-2 text-[#6C63FF] font-bold text-xs uppercase tracking-wide mb-3">
              <Sparkles className="w-4 h-4" /> AI Understanding
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex gap-2">
                <Tag className="w-4 h-4 text-[#6B6B8A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6B8A] text-xs">Interpreted as</p>
                  <p className="text-white text-sm font-bold">{aiResult.interpreted}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-[#6B6B8A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6B8A] text-xs">Price Range</p>
                  <p className="font-mono-price text-[#00D4AA] text-sm font-bold">{aiResult.priceRange}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Lightbulb className="w-4 h-4 text-[#6B6B8A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6B8A] text-xs">Buying Tip</p>
                  <p className="text-white text-sm">{aiResult.suggestion}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">
            {loading ? "Finding prices..." : query ? "Results for \"" + query + "\"" : "Search something above"}
          </h2>
          {!loading && <span className="text-[#6B6B8A] text-sm">{results.length} results</span>}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-[#6C63FF] animate-spin" />
            <p className="text-[#6B6B8A] text-sm">AI is fetching real prices for you...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {results.map((item, i) => <PriceCard key={i} {...item} index={i} />)}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return <Suspense><SearchResults /></Suspense>;
}