"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Search, BookMarked, ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Markets", icon: <TrendingUp size={14} /> },
    { href: "/search", label: "Search", icon: <Search size={14} /> },
    { href: "/fair-price", label: "Fair Price", icon: <ShieldCheck size={14} /> },
    { href: "/watchlist", label: "Watchlist", icon: <BookMarked size={14} /> },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, background: "#1C1C1C", borderBottom: "1px solid #2A2A2A" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "#00B386", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={16} color="#fff" />
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            Price<span style={{ color: "#00B386" }}>Pulse</span>
          </span>
          <span style={{ background: "#F0B429", color: "#1C1C1C", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 3, letterSpacing: "0.05em" }}>INDIA</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 500, background: path === l.href ? "rgba(0,179,134,0.15)" : "transparent", color: path === l.href ? "#00B386" : "#9CA3AF", transition: "all 0.15s" }}>
              {l.icon}{l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00B386" }} className="pulse" />
          <span style={{ color: "#9CA3AF", fontSize: 11 }}>Live</span>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, display: "none" }} className="show-mobile">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "#242424", borderTop: "1px solid #2A2A2A", padding: "8px 20px" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", textDecoration: "none", fontSize: 14, color: path === l.href ? "#00B386" : "#9CA3AF", borderBottom: "1px solid #2A2A2A" }}>
              {l.icon}{l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}