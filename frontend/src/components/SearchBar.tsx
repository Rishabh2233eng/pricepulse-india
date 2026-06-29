"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar() {
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
        const aiEncoded = encodeURIComponent(JSON.stringify(data.result));
        const term = encodeURIComponent(data.result.searchTerm);
        router.push("/search?q=" + term + "&ai=" + aiEncoded);
      } else {
        router.push("/search?q=" + encodeURIComponent(query.trim()));
      }
    } catch {
      router.push("/search?q=" + encodeURIComponent(query.trim()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center border-2 border-[#1C1B19] bg-[#FBF8F1] rounded-sm card-shadow">
          <div className="pl-4 text-[#1C1B19]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tamatar, sona, petrol, mobile... kuch bhi search karo"
            className="w-full bg-transparent px-4 py-4 text-[#1C1B19] placeholder-[#6B6357] focus:outline-none text-base"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="m-2 px-5 py-2.5 bg-[#E8871E] hover:bg-[#C56F12] disabled:opacity-40 disabled:cursor-not-allowed text-[#1C1B19] font-bold rounded-sm transition-all text-sm"
          >
            {loading ? "Soch raha hu..." : "Rate Dekho"}
          </button>
        </div>
      </form>
      <p className="text-center text-xs text-[#6B6357] mt-3">
        Try:{" "}
        {["tomato", "petrol", "gold", "iPhone", "bike", "car", "laptop"].map((term, i, arr) => (
          <span key={term}>
            <span className="cursor-pointer hover:text-[#E8871E] transition-colors underline decoration-dotted" onClick={() => setQuery(term)}>{term}</span>
            {i < arr.length - 1 && " · "}
          </span>
        ))}
      </p>
    </div>
  );
}