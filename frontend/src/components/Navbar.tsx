"use client";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="text-emerald-400 w-6 h-6" />
          <span className="text-white font-bold text-xl tracking-tight">
            Price<span className="text-emerald-400">Pulse</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/search" className="hover:text-white transition-colors">Search</Link>
          <Link href="/trends" className="hover:text-white transition-colors">Trends</Link>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            🇮🇳 India
          </span>
        </div>
      </div>
    </nav>
  );
}