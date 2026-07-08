"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({ autoFocus = false, large = false }: { autoFocus?: boolean; large?: boolean }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
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

  const suggestions = ["mango", "gold", "petrol Delhi", "iPhone 16", "Royal Enfield", "Tata Nexon", "cashew", "AC"];

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSearch}>
        <div style={{ display: "flex", alignItems: "center", background: "#FAF7F2", border: "1.5px solid " + (focused ? "#2D7A4F" : "#C8B89A"), borderRadius: 9, overflow: "hidden", transition: "all 0.15s", boxShadow: focused ? "0 0 0 3px rgba(45,122,79,0.1)" : "0 1px 4px rgba(30,18,8,0.06)" }}>
          <div style={{ padding: "0 14px", color: focused ? "#2D7A4F" : "#9A8A6E", flexShrink: 0 }}>
            {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Search size={16} strokeWidth={2} />}
          </div>
          <input autoFocus={autoFocus} type="text" value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search — tamatar, sona, petrol, iPhone, Tata Nexon, cashew..."
            style={{ flex: 1, border: "none", outline: "none", padding: large ? "14px 0" : "11px 0", fontSize: large ? 15 : 14, color: "#1A1208", background: "transparent", fontFamily: "inherit" }} />
          <button type="submit" disabled={loading || !query.trim()}
            style={{ margin: 6, padding: large ? "10px 22px" : "8px 18px", background: "#1E5C3A", color: "#FAF7F2", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: query.trim() ? "pointer" : "default", transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "-0.01em", opacity: !query.trim() ? 0.5 : 1 }}
            onMouseEnter={e => { if (query.trim()) (e.currentTarget as HTMLElement).style.background = "#2D7A4F"; }}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1E5C3A"}>
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {suggestions.map((s) => (
          <button key={s} onClick={() => setQuery(s)}
            style={{ fontSize: 11, padding: "4px 11px", border: "1px solid #DDD4BE", borderRadius: 20, background: "#FAF7F2", color: "#6B5B3E", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit", fontWeight: 500 }}
            onMouseEnter={e => { const t = e.target as HTMLElement; t.style.borderColor = "#2D7A4F"; t.style.color = "#1E5C3A"; t.style.background = "#E8F5EE"; }}
            onMouseLeave={e => { const t = e.target as HTMLElement; t.style.borderColor = "#DDD4BE"; t.style.color = "#6B5B3E"; t.style.background = "#FAF7F2"; }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}