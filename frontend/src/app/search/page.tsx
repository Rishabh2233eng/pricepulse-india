"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceCard from "@/components/PriceCard";
import SearchBar from "@/components/SearchBar";
import { Loader2 } from "lucide-react";

interface Price {
  name: string;
  price: string;
  unit: string;
  change: number;
  source: string;
  category: string;
  description: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/prices?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => { setResults(data.prices); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <main className="min-h-screen bg-[#080B0F] text-white">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <SearchBar />
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {loading ? "Searching..." : `Results for "${query}"`}
          </h2>
          <span className="text-xs text-gray-500">{results.length} results found</span>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
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