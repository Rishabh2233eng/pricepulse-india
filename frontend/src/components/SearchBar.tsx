"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Sparkles } from "lucide-react";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (data.success && data.result?.searchTerm) {
        router.push("/search?q=" + encodeURIComponent(data.result.searchTerm) + "&ai=" + encodeURIComponent(JSON.stringify(data.result)));
      } else {
        router.push("/search?q=" + encodeURIComponent(query.trim()));
      }
    } catch {
      router.push("/search?q=" + encodeURIComponent(query.trim()));
    } finally {
      setLoading(false);
    }
  };

  const suggestions = ["cheapest phone under 15k", "gold price today", "petrol Mumbai", "MacBook Air", "Royal Enfield", "AC under 35000"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center bg-[#12121A] border border-[#2A2A3A] rounded-2xl focus-within:border-[#6C63FF] focus-within:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] transition-all">
          <div className="pl-5 text-[#6B6B8A]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-[#6C63FF]" /> : <Search className="w-5 h-5" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any product — phones, vegetables, gold, bikes, cars..."
            className={"w-full bg-transparent px-4 text-white placeholder-[#6B6B8A] focus:outline-none " + (large ? "py-5 text-base" : "py-4 text-sm")}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="m-2 px-5 py-2.5 btn-primary text-sm flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => { setQuery(s); }}
            className="text-xs px-3 py-1.5 bg-[#1A1A24] hover:bg-[#6C63FF]/20 text-[#6B6B8A] hover:text-[#6C63FF] border border-[#2A2A3A] hover:border-[#6C63FF]/30 rounded-full transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}