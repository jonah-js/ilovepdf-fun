"use client";
// app/tools/split/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { fileToBuffer, getPageCount, splitPdf, parsePageRange, downloadPdf } from "@/lib/pdfHelpers";

export default function SplitPage() {
  const { t } = useLang();
  const [buffer, setBuffer]     = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange]       = useState("");
  const [status, setStatus]     = useState(null);
  const [loading, setLoading]   = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const buf   = await fileToBuffer(file);
      const count = await getPageCount(buf);
      setBuffer(buf);
      setPageCount(count);
      setStatus({ type: "inf", msg: `${count} ${t("split_pages")}` });
      setRange(`1-${count}`);
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
  }

  async function handleSplit() {
    if (!buffer || !range.trim()) return;
    setLoading(true);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const pages = parsePageRange(range, pageCount);
      const bytes = await splitPdf(buffer, pages);
      downloadPdf(bytes, "extracted.pdf");
      setStatus({ type: "ok", msg: t("split_done") });
    } catch {
      setStatus({ type: "err", msg: t("split_err_range") });
    }
    setLoading(false);
  }

  return (
    <ToolShell titleKey="split_title" descKey="split_desc"
               topAdSlot="3100000001" bottomAdSlot="3100000002">

      {/* Upload */}
      {!buffer ? (
        <label className="drop-zone" style={{ display: "block" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>✂️</div>
          <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
            {t("upload_label")}
          </p>
          <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t("upload_hint")}</p>
          <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      ) : (
        <>
          {/* Page range input */}
          <label style={{ display: "block", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>
              {t("split_range")}
            </span>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="1-3, 5, 7-9"
              style={{
                display: "block",
                width: "100%",
                marginTop: 8,
                padding: "12px 16px",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                fontSize: 15,
                color: "var(--text-1)",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--brand)"}
              onBlur={(e)  => e.target.style.borderColor = "var(--border)"}
            />
          </label>

          {/* Page count info */}
          <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 20 }}>
            {pageCount} {t("split_pages")}
          </p>

          {/* Reset */}
          <button
            onClick={() => { setBuffer(null); setPageCount(0); setRange(""); setStatus(null); }}
            style={{
              fontSize: 13, color: "var(--text-2)", background: "none",
              border: "none", cursor: "pointer", marginBottom: 16, display: "block",
            }}
          >
            ← Choose another file
          </button>
        </>
      )}

      {/* Status */}
      {status && (
        <p className={`status-${status.type}`} style={{ marginBottom: 14 }}>
          {status.msg}
        </p>
      )}

      {/* Action button */}
      <button
        className="btn-primary"
        onClick={handleSplit}
        disabled={!buffer || !range.trim() || loading}
      >
        {loading ? t("processing") : t("split_btn")}
      </button>

    </ToolShell>
  );
}
