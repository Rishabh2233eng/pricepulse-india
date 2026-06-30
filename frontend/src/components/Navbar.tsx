"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search" },
    { href: "/fair-price", label: "Am I Cheated?" },
    { href: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-[#1C1B19] bg-[#E8DCC0]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 bg-[#E8871E] border-2 border-[#1C1B19] flex items-center justify-center text-[#1C1B19] font-display text-lg card-shadow group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
            ₹
          </span>
          <span className="font-display text-xl tracking-tight text-[#1C1B19]">
            Price<span className="text-[#E8871E]">Pulse</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={"px-3 py-1.5 text-sm font-medium rounded-sm transition-all " + (path === link.href ? "bg-[#1C1B19] text-[#F7F2E9]" : "text-[#1C1B19] hover:bg-[#1C1B19]/10")}
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2 px-3 py-1 bg-[#1C1B19] text-[#F7F2E9] text-xs font-bold tracking-wide rounded-sm">
            🇮🇳 INDIA
          </span>
        </div>
      </div>
    </nav>
  );
}