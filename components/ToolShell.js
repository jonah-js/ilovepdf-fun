"use client";
// components/ToolShell.js
// Wraps every tool page with consistent layout:
// back link, title, description, ad slots, privacy note.

import Link from "next/link";
import AdBanner from "./AdBanner";
import { useLang } from "./Providers";

export default function ToolShell({
  titleKey,       // i18n key for h1
  descKey,        // i18n key for subtitle
  topAdSlot,      // AdSense slot shown above the tool
  bottomAdSlot,   // AdSense slot shown below the tool
  children,       // The actual tool UI
}) {
  const { t } = useLang();

  return (
    <div className="tool-container" style={{ paddingTop: 40, paddingBottom: 60 }}>

      {/* Back */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "var(--text-2)",
          marginBottom: 24,
          fontWeight: 500,
        }}
      >
        {t("back")}
      </Link>

      {/* Title + description */}
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.4px", marginBottom: 8 }}>
        {t(titleKey)}
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 28 }}>
        {t(descKey)}
      </p>

      {/* Top ad */}
      <AdBanner slot={topAdSlot} style={{ marginBottom: 28 }} />

      {/* Tool content */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-xl)",
        padding: 28,
      }}>
        {children}
      </div>

      {/* Bottom ad */}
      <AdBanner slot={bottomAdSlot} style={{ marginTop: 28 }} />

      {/* Privacy note */}
      <p style={{
        marginTop: 20,
        fontSize: 12,
        color: "var(--text-3)",
        textAlign: "center",
        lineHeight: 1.6,
      }}>
        🔒 {t("privacy_note")}
      </p>

    </div>
  );
}
