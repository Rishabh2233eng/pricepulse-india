"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceCard from "@/components/PriceCard";
import SearchBar from "@/components/SearchBar";
import { Loader2, Sparkles, TrendingUp, Tag, Lightbulb } from "lucide-react";

interface Price {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
  description: string;
}

interface AiResult {
  interpreted: string;
  category: string;
  searchTerm: string;
  priceRange: string;
  insight: string;
  suggestion: string;
}

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
    if (aiRaw) {
      try { setAiResult(JSON.parse(decodeURIComponent(aiRaw))); } catch {}
    }
    if (!q) { setLoading(false); return; }
    setLoading(true);
    fetch("/api/prices?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then((data) => { setResults(data.prices || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <SearchBar />
        </div>

        {aiResult && aiResult.interpreted && (
          <div className="bg-[#FBF8F1] border-2 border-[#0F5C5C] rounded-sm p-5 mb-6 space-y-3 card-shadow">
            <div className="flex items-center gap-2 text-[#0F5C5C] font-bold text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4" /> AI Samjha Aapko
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex gap-2">
                <Tag className="w-4 h-4 text-[#6B6357] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6357] text-xs">Interpreted as</p>
                  <p className="text-[#1C1B19] text-sm font-bold font-display">{aiResult.interpreted}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-[#6B6357] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6357] text-xs">Estimated Price Range</p>
                  <p className="font-mono-price text-[#0F5C5C] text-sm font-bold">{aiResult.priceRange}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Lightbulb className="w-4 h-4 text-[#6B6357] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#6B6357] text-xs">Buying Tip</p>
                  <p className="text-[#1C1B19] text-sm">{aiResult.suggestion}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 ledger-line pb-3">
          <h2 className="font-display text-xl">
            {loading ? "Dhund rahe hai..." : query ? "Results for \"" + query + "\"" : "Search something above"}
          </h2>
          <span className="text-xs text-[#6B6357] font-bold">{results.length} results found</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#E8871E] animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {results.map((item, i) => <PriceCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return <Suspense><SearchResults /></Suspense>;
}