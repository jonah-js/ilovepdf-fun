"use client";

import Link from "next/link";
import { useLang } from "./Providers";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{
      background: "var(--surface)",
      borderTop: "1.5px solid var(--border)",
      padding: "28px 16px",
      marginTop: "auto",
    }}>
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        textAlign: "center",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 1,
          fontWeight: 700, fontSize: 17, color: "var(--text-1)",
        }}>
          <span>i</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand)"
               style={{ margin: "0 3px", marginTop: -1 }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                     C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>PDF</span>
          <span style={{ color: "#7A6F6A", fontWeight: 600, fontSize: 13 }}>.fun</span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { href: "/imprint", label: t("imprint") },
            { href: "/privacy", label: t("privacy") },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: 13, color: "var(--text-3)", fontWeight: 500,
              transition: "color 0.12s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-1)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-3)"}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright + privacy statement */}
        <p style={{ fontSize: 12, color: "var(--text-3)" }}>
          © {new Date().getFullYear()} ilovepdf.fun — {t("footer_rights")}
        </p>
        <p style={{ fontSize: 11, color: "var(--text-3)" }}>
          🔒 {t("footer_privacy")}
        </p>

      </div>
    </footer>
  );
}