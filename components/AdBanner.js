"use client";
// components/AdBanner.js
//
// HOW TO ACTIVATE ADSENSE:
//   1. Set ADSENSE_ACTIVE to true
//   2. Replace PUBLISHER_ID with your ca-pub-XXXXXXXXXXXXXXXX id
//   3. Replace each slot prop with the slot number from AdSense dashboard
//   4. Uncomment the <script> in app/layout.js
//
// Until then, a warm placeholder is shown so you can see the layout.

import { useEffect } from "react";

const ADSENSE_ACTIVE = false;                       // ← change to true
const PUBLISHER_ID   = "ca-pub-XXXXXXXXXXXXXXXX";   // ← your publisher id

export default function AdBanner({ slot, style = {} }) {
  useEffect(() => {
    if (!ADSENSE_ACTIVE) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch (_) {}
  }, []);

  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--r-md)",
    minHeight: 90,
    ...style,
  };

  if (!ADSENSE_ACTIVE) {
    return (
      <div style={{
        ...baseStyle,
        background: "var(--border)",
        color: "var(--text-3)",
        fontSize: 11,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}>
        Advertisement
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
