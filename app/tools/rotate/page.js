"use client";
// app/tools/rotate/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { fileToBuffer, rotatePdf, downloadPdf } from "@/lib/pdfHelpers";

const ROTATIONS = [
  { labelKey: "rotate_btn_90",  deg: 90,  icon: "↻" },
  { labelKey: "rotate_btn_180", deg: 180, icon: "↕" },
  { labelKey: "rotate_btn_270", deg: 270, icon: "↺" },
];

export default function RotatePage() {
  const { t } = useLang();
  const [buffer, setBuffer]   = useState(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDeg, setActiveDeg] = useState(null);

  async function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    setBuffer(await fileToBuffer(f));
    setFileName(f.name);
    setStatus(null);
    setActiveDeg(null);
  }

  async function handleRotate(deg) {
    if (!buffer) return;
    setLoading(true);
    setActiveDeg(deg);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const bytes = await rotatePdf(buffer, deg);
      downloadPdf(bytes, `rotated-${deg}.pdf`);
      setStatus({ type: "ok", msg: t("rotate_done") });
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
    setLoading(false);
    setActiveDeg(null);
  }

  return (
    <ToolShell titleKey="rotate_title" descKey="rotate_desc"
               topAdSlot="3300000001" bottomAdSlot="3300000002">

      {/* Upload */}
      <label className="drop-zone" style={{ display: "block", marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🔄</div>
        <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
          {fileName || t("upload_label")}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t("upload_hint")}</p>
        <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: "none" }} />
      </label>

      {/* Rotation buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {ROTATIONS.map(({ labelKey, deg, icon }) => (
          <button
            key={deg}
            onClick={() => handleRotate(deg)}
            disabled={!buffer || loading}
            style={{
              padding: "16px 12px",
              border: "1.5px solid",
              borderColor: activeDeg === deg ? "var(--brand)" : "var(--border)",
              background: activeDeg === deg ? "var(--brand)" : "var(--surface)",
              color: activeDeg === deg ? "#fff" : "var(--text-1)",
              borderRadius: "var(--r-md)",
              cursor: !buffer || loading ? "not-allowed" : "pointer",
              opacity: !buffer ? 0.4 : 1,
              transition: "all 0.15s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 24 }}>{icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{t(labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Status */}
      {status && <p className={`status-${status.type}`}>{status.msg}</p>}

    </ToolShell>
  );
}
