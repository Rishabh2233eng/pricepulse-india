"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getWatchlist, removeFromWatchlist, setTargetPrice, WatchItem } from "@/lib/watchlist";
import { Trash2, Bell, BellOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchItem[]>([]);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState("");

  useEffect(() => {
    setItems(getWatchlist());
  }, []);

  const handleRemove = (name: string) => {
    const updated = removeFromWatchlist(name);
    setItems(updated);
  };

  const handleSetTarget = (name: string) => {
    if (!targetInput) return;
    const updated = setTargetPrice(name, parseFloat(targetInput));
    setItems(updated);
    setEditingTarget(null);
    setTargetInput("");
  };

  return (
    <main className="min-h-screen bg-[#E8DCC0] text-[#1C1B19]">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6B6357] hover:text-[#1C1B19] text-sm mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-3xl mb-2">My Watchlist</h1>
          <p className="text-[#6B6357] text-sm">Track prices and set alerts for products you care about</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#FBF8F1] border-2 border-dashed border-[#B8A878] rounded-sm p-12 text-center">
            <p className="text-[#6B6357] mb-2">Your watchlist is empty</p>
            <Link href="/" className="text-[#E8871E] font-bold hover:underline">
              Browse products to add →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const currentPrice = parseFloat(item.price.replace(/,/g, ""));
              const isBelowTarget = item.targetPrice && currentPrice <= item.targetPrice;
              return (
                <div key={item.name} className="bg-[#FBF8F1] border-2 border-[#1C1B19] rounded-sm p-5 card-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-[#6B6357] border border-[#DDD4C2] px-2 py-0.5 rounded-sm">{item.category}</span>
                      <h3 className="font-display text-lg mt-2">{item.name}</h3>
                      <p className="font-mono-price text-xl font-bold text-[#1C1B19] mt-1">
                        ₹{currentPrice.toLocaleString("en-IN")} <span className="text-sm text-[#6B6357] font-normal">/ {item.unit}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.name)}
                      className="text-[#B33A2E] hover:bg-[#B33A2E]/10 p-2 rounded-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-4 ledger-line">
                    {item.targetPrice ? (
                      <div className={"flex items-center justify-between p-3 rounded-sm " + (isBelowTarget ? "bg-[#0F5C5C]/10 border border-[#0F5C5C]" : "bg-[#E8871E]/10 border border-[#E8871E]")}>
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#1C1B19]" />
                          <span className="text-sm">
                            Alert at <span className="font-mono-price font-bold">₹{item.targetPrice.toLocaleString("en-IN")}</span>
                          </span>
                        </div>
                        {isBelowTarget && (
                          <span className="text-xs font-bold text-[#0F5C5C]">🎉 Target reached!</span>
                        )}
                      </div>
                    ) : editingTarget === item.name ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={targetInput}
                          onChange={(e) => setTargetInput(e.target.value)}
                          placeholder="Target price"
                          className="flex-1 bg-[#F0E9D8] border-2 border-[#1C1B19] rounded-sm px-3 py-2 text-sm focus:outline-none font-mono-price"
                        />
                        <button
                          onClick={() => handleSetTarget(item.name)}
                          className="px-4 py-2 bg-[#E8871E] text-[#1C1B19] font-bold rounded-sm text-sm"
                        >
                          Set
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingTarget(item.name)}
                        className="flex items-center gap-2 text-sm text-[#6B6357] hover:text-[#1C1B19] transition-colors"
                      >
                        <BellOff className="w-4 h-4" /> Set price alert
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}