"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Search, BookMarked, ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Markets", icon: TrendingUp },
  { href: "/search", label: "Search", icon: Search },
  { href: "/fair-price", label: "Fair Price", icon: ShieldCheck },
  { href: "/watchlist", label: "Watchlist", icon: BookMarked },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: "#111111", borderBottom: "1px solid #222" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, background: "#059669", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <TrendingUp size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}>
            Price<span style={{ color: "#059669" }}>Pulse</span>
          </span>
          <span style={{ background: "#D97706", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.08em" }}>INDIA</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-xs">
          {links.map((l) => {
            const Icon = l.icon;
            const active = path === l.href;
            return (
              <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 7, textDecoration: "none", fontSize: 13, fontWeight: 500, color: active ? "#059669" : "#9CA3AF", background: active ? "rgba(5,150,105,0.1)" : "transparent", transition: "all 0.15s" }}>
                <Icon size={13} strokeWidth={2} />
                {l.label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669", display: "inline-block" }} className="pulse" />
            <span style={{ color: "#6B7280", fontSize: 11, fontWeight: 500 }} className="hide-xs">Live</span>
          </div>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "1px solid #333", borderRadius: 6, cursor: "pointer", color: "#9CA3AF", padding: "5px 8px", display: "none" }} className="show-xs">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "#1A1A1A", borderTop: "1px solid #222", padding: "8px 24px 16px" }}>
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", textDecoration: "none", fontSize: 14, fontWeight: 500, color: path === l.href ? "#059669" : "#9CA3AF", borderBottom: "1px solid #222" }}>
                <Icon size={15} strokeWidth={2} />{l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}