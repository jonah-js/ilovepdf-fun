"use client";
// app/tools/remove-password/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { fileToBuffer, removePassword, downloadPdf } from "@/lib/pdfHelpers";

export default function RemovePasswordPage() {
  const { t } = useLang();
  const [buffer, setBuffer]   = useState(null);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    setBuffer(await fileToBuffer(f));
    setFileName(f.name);
    setStatus(null);
  }

  async function handleUnlock() {
    if (!buffer) return;
    setLoading(true);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const bytes = await removePassword(buffer, password);
      downloadPdf(bytes, "unlocked.pdf");
      setStatus({ type: "ok", msg: t("unlock_done") });
    } catch {
      setStatus({ type: "err", msg: t("unlock_err") });
    }
    setLoading(false);
  }

  return (
    <ToolShell titleKey="unlock_title" descKey="unlock_desc"
               topAdSlot="3500000001" bottomAdSlot="3500000002">

      {/* Upload */}
      <label className="drop-zone" style={{ display: "block", marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🔓</div>
        <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
          {fileName || t("upload_label")}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t("upload_hint")}</p>
        <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: "none" }} />
      </label>

      {/* Password field */}
      {buffer && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", display: "block", marginBottom: 8 }}>
            {t("unlock_pw_label")}
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="••••••••"
              style={{
                display: "block",
                width: "100%",
                padding: "12px 44px 12px 16px",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                fontSize: 15,
                color: "var(--text-1)",
                outline: "none",
                background: "var(--bg)",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--brand)"}
              onBlur={(e)  => e.target.style.borderColor = "var(--border)"}
            />
            {/* Show/hide toggle */}
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: 16,
                color: "var(--text-3)",
              }}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      {status && (
        <p className={`status-${status.type}`} style={{ marginBottom: 14 }}>
          {status.msg}
        </p>
      )}

      {/* Action */}
      <button
        className="btn-primary"
        onClick={handleUnlock}
        disabled={!buffer || loading}
      >
        {loading ? t("processing") : t("unlock_btn")}
      </button>

    </ToolShell>
  );
}
