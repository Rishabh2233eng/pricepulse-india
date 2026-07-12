"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TrendingUp, Search, BookMarked, ShieldCheck, Menu, X, ShoppingBasket } from "lucide-react";

const links = [
  { href: "/", label: "Markets", icon: TrendingUp },
  { href: "/search", label: "Search", icon: Search },
  { href: "/basket", label: "Budget Basket", icon: ShoppingBasket },
  { href: "/fair-price", label: "Fair Price", icon: ShieldCheck },
  { href: "/watchlist", label: "Watchlist", icon: BookMarked },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: "#1E3A2F", borderBottom: "1px solid #163020" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, background: "#4CAF7D", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={15} color="#1E3A2F" strokeWidth={2.5} />
          </div>
          <span style={{ color: "#FAF7F2", fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}>
            Price<span style={{ color: "#4CAF7D" }}>Pulse</span>
          </span>
          <span style={{ background: "#C8A84B", color: "#1A1208", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.08em" }}>INDIA</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-xs">
          {links.map((l) => {
            const Icon = l.icon;
            const active = path === l.href;
            return (
              <Link key={l.href} href={l.href}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 7, textDecoration: "none", fontSize: 13, fontWeight: 500, color: active ? "#4CAF7D" : "#9A8A6E", background: active ? "rgba(76,175,125,0.12)" : "transparent", transition: "all 0.15s" }}>
                <Icon size={13} strokeWidth={2} />{l.label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF7D", display: "inline-block" }} className="pulse" />
          <span style={{ color: "#6B5B3E", fontSize: 11, fontWeight: 500 }} className="hide-xs">Live</span>
          <button onClick={() => setOpen(!open)}
            style={{ background: "none", border: "1px solid #2D4A3E", borderRadius: 6, cursor: "pointer", color: "#9A8A6E", padding: "5px 8px" }}
            className="show-xs" aria-label="menu">
            {open ? <X size={16} color="#9A8A6E" /> : <Menu size={16} color="#9A8A6E" />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "#172E22", borderTop: "1px solid #163020", padding: "8px 24px 16px" }}>
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", textDecoration: "none", fontSize: 14, fontWeight: 500, color: path === l.href ? "#4CAF7D" : "#9A8A6E", borderBottom: "1px solid #1E3A2F" }}>
                <Icon size={15} strokeWidth={2} />{l.label}
              </Link>
            );
          })}
        </div>
      )}
      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        {links.map((l) => {
          const Icon = l.icon;
          const active = path === l.href;
          return (
            <Link key={l.href} href={l.href}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 12px", flex: 1 }}>
              <Icon size={20} strokeWidth={2} color={active ? "#4CAF7D" : "#6B5B3E"} />
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#4CAF7D" : "#6B5B3E", letterSpacing: "0.04em" }}>{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}