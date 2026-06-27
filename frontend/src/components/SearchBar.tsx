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
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center group">
        <div className="absolute left-4 text-gray-400 group-focus-within:text-emerald-400 transition-colors">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything — onions, gold, iPhone, petrol, bikes..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-32 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all text-base"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-all text-sm"
        >
          Search
        </button>
      </div>
      <p className="text-center text-xs text-gray-600 mt-3">
        Try:{" "}
        {["tomato", "petrol", "gold", "iPhone", "bike", "car", "laptop"].map((term, i, arr) => (
          <span key={term}>
            <span className="text-gray-500 cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => setQuery(term)}>{term}</span>
            {i < arr.length - 1 && " · "}
          </span>
        ))}
      </p>
    </form>
  );
}