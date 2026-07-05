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
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1.5px solid " + (focused ? "#059669" : "#E8E7E3"), borderRadius: 10, overflow: "hidden", transition: "border-color 0.15s, box-shadow 0.15s", boxShadow: focused ? "0 0 0 3px rgba(5,150,105,0.08)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "0 14px", color: focused ? "#059669" : "#9CA3AF", flexShrink: 0, transition: "color 0.15s" }}>
            {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Search size={16} strokeWidth={2} />}
          </div>
          <input
            autoFocus={autoFocus}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search any product — tomato, gold, petrol, iPhone 16, Tata Nexon, cashew..."
            style={{ flex: 1, border: "none", outline: "none", padding: large ? "14px 0" : "11px 0", fontSize: large ? 15 : 14, color: "#111", background: "transparent", fontFamily: "inherit" }}
          />
          <button type="submit" disabled={loading || !query.trim()}
            style={{ margin: 6, padding: large ? "10px 22px" : "8px 18px", background: query.trim() ? "#059669" : "#E8E7E3", color: query.trim() ? "#fff" : "#9CA3AF", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: query.trim() ? "pointer" : "default", transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "-0.01em" }}>
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => { setQuery(s); }}
            style={{ fontSize: 11, padding: "4px 11px", border: "1px solid #E8E7E3", borderRadius: 20, background: "#fff", color: "#666", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit", fontWeight: 500 }}
            onMouseEnter={e => { const t = e.target as HTMLElement; t.style.borderColor = "#059669"; t.style.color = "#059669"; t.style.background = "#ECFDF5"; }}
            onMouseLeave={e => { const t = e.target as HTMLElement; t.style.borderColor = "#E8E7E3"; t.style.color = "#666"; t.style.background = "#fff"; }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}