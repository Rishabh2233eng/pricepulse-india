"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-[#1C1B19] bg-[#F7F2E9]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 bg-[#E8871E] rounded-sm flex items-center justify-center text-[#1C1B19] font-display text-lg">₹</span>
          <span className="font-display text-xl tracking-tight text-[#1C1B19]">
            Price<span className="text-[#E8871E]">Pulse</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-[#1C1B19] hover:text-[#E8871E] transition-colors">Home</Link>
          <Link href="/search" className="text-[#1C1B19] hover:text-[#E8871E] transition-colors">Search</Link>
          <Link href="/fair-price" className="text-[#B33A2E] hover:opacity-70 transition-opacity">Am I Cheated?</Link>
          <span className="px-3 py-1 rounded-sm bg-[#1C1B19] text-[#F7F2E9] text-xs font-bold tracking-wide">
            भारत · INDIA
          </span>
        </div>
      </div>
    </nav>
  );
}