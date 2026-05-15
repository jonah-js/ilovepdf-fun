"use client";

import Link from "next/link";
import { useLang } from "./Providers";
import { langNames, supportedLangs } from "@/lib/i18n";

export default function Header() {
  const { t, lang, switchLang } = useLang();

  return (
    <header style={{
      background: "var(--surface)",
      borderBottom: "1.5px solid var(--border)",
      height: 58,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>

      <Link href="/" style={{
        display: "flex", alignItems: "center", gap: 1,
        fontWeight: 700, fontSize: 22, letterSpacing: "-0.4px",
        color: "var(--text-1)", userSelect: "none", flexShrink: 0,
      }}>
        <span>i</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--brand)"
             style={{ margin: "0 3px", flexShrink: 0, marginTop: -1 }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span>PDF</span>
        <span style={{ color: "#7A6F6A", fontWeight: 600, fontSize: 17 }}>.fun</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <nav className="header-nav">
          {[
            { key: "nav_all",      href: "/" },
            { key: "nav_organize", href: "/#tools" },
            { key: "nav_security", href: "/tools/remove-password" },
          ].map(({ key, href }) => (
            <Link key={key} href={href} style={{
              padding: "6px 11px", borderRadius: "var(--r-full)",
              fontSize: 13, fontWeight: 500, color: "var(--text-2)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; }}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div style={{
          display: "flex",
          background: "var(--bg)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--r-full)",
          padding: 3,
          gap: 2,
        }}>
          {supportedLangs.map((l) => (
            <button key={l} onClick={() => switchLang(l)} style={{
              padding: "4px 10px",
              borderRadius: "var(--r-full)",
              fontSize: 12, fontWeight: 700,
              border: "none",
              background: lang === l ? "var(--brand)" : "transparent",
              color: lang === l ? "#fff" : "var(--text-3)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}>
              {langNames[l]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}