"use client";
// app/tools/delete-pages/page.js

import { useState } from "react";
import ToolShell from "@/components/ToolShell";
import { useLang } from "@/components/Providers";
import { fileToBuffer, getPageCount, deletePages, downloadPdf } from "@/lib/pdfHelpers";

export default function DeletePagesPage() {
  const { t } = useLang();
  const [buffer, setBuffer]       = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [selected, setSelected]   = useState(new Set());
  const [status, setStatus]       = useState(null);
  const [loading, setLoading]     = useState(false);

  async function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const buf   = await fileToBuffer(f);
      const count = await getPageCount(buf);
      setBuffer(buf);
      setPageCount(count);
      setSelected(new Set());
      setStatus(null);
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
  }

  function togglePage(n) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  }

  async function handleDelete() {
    if (selected.size === 0) {
      setStatus({ type: "err", msg: t("delete_min") });
      return;
    }
    setLoading(true);
    setStatus({ type: "inf", msg: t("processing") });
    try {
      const bytes = await deletePages(buffer, [...selected]);
      downloadPdf(bytes, "pages-deleted.pdf");
      setStatus({ type: "ok", msg: t("delete_done") });
      setSelected(new Set());
    } catch {
      setStatus({ type: "err", msg: t("error_generic") });
    }
    setLoading(false);
  }

  return (
    <ToolShell titleKey="delete_title" descKey="delete_desc"
               topAdSlot="3400000001" bottomAdSlot="3400000002">

      {/* Upload */}
      <label className="drop-zone" style={{ display: "block", marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🗑️</div>
        <p style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
          {t("upload_label")}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t("upload_hint")}</p>
        <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: "none" }} />
      </label>

      {/* Page selector grid */}
      {pageCount > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 10 }}>
            {t("delete_select")}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
            gap: 6,
            marginBottom: 10,
          }}>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => togglePage(n)}
                style={{
                  padding: "10px 4px",
                  borderRadius: "var(--r-sm)",
                  border: "1.5px solid",
                  borderColor: selected.has(n) ? "var(--brand)" : "var(--border)",
                  background: selected.has(n) ? "var(--brand)" : "var(--bg)",
                  color: selected.has(n) ? "#fff" : "var(--text-1)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.12s",
                }}
              >
                {n}
              </button>
            ))}
          </div>

          {selected.size > 0 && (
            <p style={{ fontSize: 13, color: "var(--brand)", fontWeight: 500 }}>
              {selected.size} {t("delete_selected")}
            </p>
          )}
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
        onClick={handleDelete}
        disabled={!buffer || selected.size === 0 || loading}
      >
        {loading ? t("processing") : t("delete_btn")}
      </button>

    </ToolShell>
  );
}
