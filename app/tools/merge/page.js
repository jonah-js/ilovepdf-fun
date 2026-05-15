"use client";
// app/tools/merge/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { mergePdfs, downloadPdf } from "@/lib/pdfHelpers";

export default function MergePage() {
  const { t } = useLang();
  const [files, setFiles]     = useState([]);
  const [status, setStatus]   = useState(null); // { type: "ok"|"err"|"inf", msg }
  const [loading, setLoading] = useState(false);

  function handleUpload(e) {
    const newFiles = Array.from(e.target.files).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...newFiles]);
    setStatus(null);
    e.target.value = "";
  }

  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function moveFile(idx, dir) {
    setFiles((prev) => {
      const arr = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
  }

  async function handleMerge() {
    if (files.length < 2) {
      setStatus({ type: "err", msg: t("merge_min") });
      return;
    }
    setLoading(true);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const bytes = await mergePdfs(files);
      downloadPdf(bytes, "merged.pdf");
      setStatus({ type: "ok", msg: t("merge_done") });
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
    setLoading(false);
  }

  return (
    <ToolShell titleKey="merge_title" descKey="merge_desc"
               topAdSlot="3000000001" bottomAdSlot="3000000002">

      {/* Upload zone */}
      <label className="drop-zone" style={{ display: "block", marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>📄</div>
        <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
          {t("upload_multiple")}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t("upload_hint_multi")}</p>
        <input
          type="file" accept=".pdf" multiple
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 10 }}>
            {t("merge_order")}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {files.map((file, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
                padding: "10px 14px",
              }}>
                {/* Order buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button
                    onClick={() => moveFile(i, -1)}
                    disabled={i === 0}
                    style={{ border: "none", background: "none", cursor: i === 0 ? "default" : "pointer",
                             fontSize: 11, color: i === 0 ? "var(--border)" : "var(--text-2)", lineHeight: 1 }}
                  >▲</button>
                  <button
                    onClick={() => moveFile(i, 1)}
                    disabled={i === files.length - 1}
                    style={{ border: "none", background: "none",
                             cursor: i === files.length - 1 ? "default" : "pointer",
                             fontSize: 11, color: i === files.length - 1 ? "var(--border)" : "var(--text-2)", lineHeight: 1 }}
                  >▼</button>
                </div>

                {/* Index */}
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)", minWidth: 20 }}>
                  {i + 1}
                </span>

                {/* Name */}
                <span style={{ flex: 1, fontSize: 13, color: "var(--text-1)",
                               overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>

                {/* Size */}
                <span style={{ fontSize: 12, color: "var(--text-3)", flexShrink: 0 }}>
                  {(file.size / 1024).toFixed(0)} KB
                </span>

                {/* Remove */}
                <button
                  onClick={() => removeFile(i)}
                  style={{ border: "none", background: "none", cursor: "pointer",
                           fontSize: 16, color: "var(--text-3)", lineHeight: 1,
                           padding: "0 4px" }}
                >×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      {status && (
        <p className={`status-${status.type}`} style={{ marginBottom: 14 }}>
          {status.msg}
        </p>
      )}

      {/* Merge button */}
      <button
        className="btn-primary"
        onClick={handleMerge}
        disabled={files.length < 2 || loading}
      >
        {loading ? t("processing") : t("merge_btn")}
      </button>

    </ToolShell>
  );
}
