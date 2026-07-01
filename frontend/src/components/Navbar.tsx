"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp } from "lucide-react";

export default function Navbar() {
  const path = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search" },
    { href: "/fair-price", label: "Am I Cheated?" },
    { href: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white">
            Price<span className="text-[#6C63FF]">Pulse</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={"px-4 py-2 text-sm font-medium rounded-lg transition-all " + (path === link.href ? "bg-[#6C63FF]/20 text-[#6C63FF]" : "text-[#6B6B8A] hover:text-white hover:bg-white/5")}
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-3 px-3 py-1.5 bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 text-xs font-bold rounded-full">
            🇮🇳 India
          </span>
        </div>
      </div>
    </nav>
  );
}