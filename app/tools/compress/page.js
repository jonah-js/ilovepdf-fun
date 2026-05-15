"use client";
// app/tools/compress/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { fileToBuffer, compressPdf, downloadPdf } from "@/lib/pdfHelpers";

function formatBytes(b) {
  if (b < 1024)       return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

export default function CompressPage() {
  const { t } = useLang();
  const [file, setFile]     = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [result, setResult] = useState(null); // { bytes, size }
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setBuffer(await fileToBuffer(f));
    setResult(null);
    setStatus(null);
  }

  async function handleCompress() {
    if (!buffer) return;
    setLoading(true);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const bytes = await compressPdf(buffer);
      setResult({ bytes, size: bytes.byteLength });
      setStatus({ type: "ok", msg: t("compress_done") });
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
    setLoading(false);
  }

  function handleDownload() {
    if (result) downloadPdf(result.bytes, "compressed.pdf");
  }

  return (
    <ToolShell titleKey="compress_title" descKey="compress_desc"
               topAdSlot="3200000001" bottomAdSlot="3200000002">

      {/* Upload */}
      <label className="drop-zone" style={{ display: "block", marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>📦</div>
        <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
          {file ? file.name : t("upload_label")}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>
          {file ? formatBytes(file.size) : t("upload_hint")}
        </p>
        <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: "none" }} />
      </label>

      {/* Before/after sizes */}
      {result && (
        <div style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
        }}>
          {[
            { label: "Before", value: formatBytes(file.size),   color: "var(--text-2)" },
            { label: "After",  value: formatBytes(result.size), color: "var(--green)"  },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: 1,
              background: "var(--bg)",
              borderRadius: "var(--r-md)",
              padding: "14px 16px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <p style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase",
                          letterSpacing: "0.5px", marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      {status && (
        <p className={`status-${status.type}`} style={{ marginBottom: 14 }}>
          {status.msg}
        </p>
      )}

      {/* Buttons */}
      {!result ? (
        <button
          className="btn-primary"
          onClick={handleCompress}
          disabled={!buffer || loading}
        >
          {loading ? t("processing") : t("compress_btn")}
        </button>
      ) : (
        <button className="btn-primary" onClick={handleDownload}>
          ⬇ {t("download_btn")} ({formatBytes(result.size)})
        </button>
      )}

      {/* Honest note about browser compression limits */}
      <p style={{
        marginTop: 16,
        fontSize: 12,
        color: "var(--text-3)",
        lineHeight: 1.6,
        textAlign: "center",
      }}>
        ℹ️ {t("compress_note")}
      </p>

    </ToolShell>
  );
}
