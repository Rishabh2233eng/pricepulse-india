"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
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

  return (
    <form onSubmit={handleSearch} style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1.5px solid #E5E5E0", borderRadius: 8, overflow: "hidden", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ padding: "0 14px", color: loading ? "#00B386" : "#9CA3AF" }}>
          {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Search size={16} />}
        </div>
        <input
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any product — tomato, gold, petrol, iPhone, Tata Nexon, cashew..."
          style={{ flex: 1, border: "none", outline: "none", padding: "12px 0", fontSize: 14, color: "#1C1C1C", background: "transparent" }}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          style={{ margin: 6, padding: "8px 20px", background: "#00B386", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: loading || !query.trim() ? 0.5 : 1, transition: "all 0.15s" }}
        >
          Search
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {["mango", "gold", "petrol", "iphone 16", "royal enfield", "tata nexon", "cashew"].map((s) => (
          <button key={s} type="button" onClick={() => setQuery(s)}
            style={{ fontSize: 11, padding: "3px 10px", border: "1px solid #E5E5E0", borderRadius: 20, background: "#fff", color: "#6B6B6B", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "#00B386"; (e.target as HTMLElement).style.color = "#00B386"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "#E5E5E0"; (e.target as HTMLElement).style.color = "#6B6B6B"; }}>
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}