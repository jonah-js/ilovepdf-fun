"use client";

import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { useLang } from "@/components/Providers";

const TOOLS = [
  {
    slug: "merge", titleKey: "tool_merge_title", descKey: "tool_merge_desc",
    color: "var(--brand)", bg: "var(--brand-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2"/>
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6h8"/>
        <line x1="12" y1="11" x2="12" y2="17"/>
        <line x1="9" y1="14" x2="15" y2="14"/>
      </svg>
    ),
  },
  {
    slug: "split", titleKey: "tool_split_title", descKey: "tool_split_desc",
    color: "var(--brand)", bg: "var(--brand-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
  {
    slug: "compress", titleKey: "tool_compress_title", descKey: "tool_compress_desc",
    color: "var(--amber)", bg: "var(--amber-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8"/>
        <rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
  },
  {
    slug: "rotate", titleKey: "tool_rotate_title", descKey: "tool_rotate_desc",
    color: "var(--amber)", bg: "var(--amber-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
  },
  {
    slug: "delete-pages", titleKey: "tool_delete_title", descKey: "tool_delete_desc",
    color: "var(--blue)", bg: "var(--blue-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
      </svg>
    ),
  },
  {
    slug: "remove-password", titleKey: "tool_unlock_title", descKey: "tool_unlock_desc",
    color: "var(--green)", bg: "var(--green-light)",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 019.9-1"/>
      </svg>
    ),
  },
];

function ToolCard({ tool }) {
  const { t } = useLang();
  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card">
      <div style={{
        width: 40, height: 40, background: tool.bg,
        borderRadius: "var(--r-sm)", display: "flex",
        alignItems: "center", justifyContent: "center", marginBottom: 14,
      }}>
        {tool.icon(tool.color)}
      </div>
      <h2 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 5, lineHeight: 1.3 }}>
        {t(tool.titleKey)}
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.45 }}>
        {t(tool.descKey)}
      </p>
    </Link>
  );
}

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>

      <div style={{ textAlign: "center", marginBottom: 36 }}>

  {/* Badge */}
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "var(--brand-light)", border: "1px solid var(--brand-mid)",
    borderRadius: "var(--r-full)", padding: "5px 12px", marginBottom: 20,
  }}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--brand)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--brand)" }}>
      Free · No sign-up · No upload
    </span>
  </div>

  {/* Headline — mixed fonts */}
  <h1 style={{
    fontSize: "clamp(34px, 8vw, 52px)",
    fontWeight: 700,
    letterSpacing: "-0.8px",
    lineHeight: 1.1,
    marginBottom: 16,
    color: "var(--text-1)",
  }}>
    Every{" "}
    <span style={{
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      color: "var(--brand)",
    }}>
      PDF
    </span>
    {" "}tool<br />
    you'll{" "}
    <span style={{
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      color: "var(--text-1)",
    }}>
      ever
    </span>
    {" "}need
  </h1>

  <p style={{
    fontSize: "clamp(14px, 3vw, 16px)",
    color: "var(--text-2)",
    lineHeight: 1.7,
    maxWidth: 380,
    margin: "0 auto",
  }}>
    All processing happens in your browser.
    Your files never touch our servers.
  </p>
</div>
    

      <AdBanner slot="1111111111" style={{ marginBottom: 28, minHeight: 80 }} />

      <div className="tool-grid" style={{ marginBottom: 28 }}>
        {TOOLS.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      <AdBanner slot="2222222222" style={{ marginBottom: 28, minHeight: 80 }} />

      <div className="trust-strip">
        {[
          { icon: "🔒", text: t("trust_1") },
          { icon: "⚡", text: t("trust_2") },
          { icon: "💸", text: t("trust_3") },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: "flex", alignItems: "center", gap: 7,
            fontSize: 13, color: "var(--text-2)", fontWeight: 500,
          }}>
            <span style={{ fontSize: 15 }}>{icon}</span>
            {text}
          </div>
        ))}
      </div>

      <div style={{
        background: "var(--surface)", border: "1.5px solid var(--border)",
        borderRadius: "var(--r-xl)", padding: "24px 22px",
        display: "flex", gap: 16, alignItems: "flex-start",
      }}>
        <div style={{
          width: 44, height: 44, flexShrink: 0,
          background: "var(--brand-light)", borderRadius: "var(--r-md)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--brand)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                     C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 7 }}>
            {t("why_title")}
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75 }}>
            {t("why_body")}
          </p>
        </div>
      </div>

    </div>
  );
}