"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceCard from "@/components/PriceCard";
import SearchBar from "@/components/SearchBar";
import TrendingBar from "@/components/TrendingBar";
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
    <main style={{ minHeight: "100vh", background: "#F5F5F0" }}>
      <Navbar />
      <TrendingBar />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* Search */}
        <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <SearchBar autoFocus />
        </div>

        {/* AI Card */}
        {aiResult?.interpreted && (
          <div style={{ background: "#fff", border: "1px solid #00B386", borderRadius: 10, padding: 16, marginBottom: 20 }} className="fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#00B386", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              <Sparkles size={13} /> AI Understanding
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag size={14} color="#9CA3AF" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>Interpreted as</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1C" }}>{aiResult.interpreted}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <TrendingUp size={14} color="#9CA3AF" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>Price Range</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#00B386", fontFamily: "monospace" }}>{aiResult.priceRange}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Lightbulb size={14} color="#9CA3AF" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>Buying Tip</div>
                  <div style={{ fontSize: 13, color: "#1C1C1C" }}>{aiResult.suggestion}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1C" }}>
            {loading ? "Searching..." : query ? "Results for \"" + query + "\"" : "Search something above"}
          </h2>
          {!loading && <span style={{ fontSize: 12, color: "#9CA3AF" }}>{results.length} results found</span>}
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: 12 }}>
            <Loader2 size={32} color="#00B386" style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ color: "#9CA3AF", fontSize: 13 }}>Fetching real prices for you...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
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