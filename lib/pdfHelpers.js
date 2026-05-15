// lib/pdfHelpers.js
// All PDF processing logic in one place.
// Uses pdf-lib which runs entirely in the browser — no server needed.

import { PDFDocument, degrees } from "pdf-lib";

/** Convert a File object to ArrayBuffer */
export async function fileToBuffer(file) {
  return await file.arrayBuffer();
}

/** Trigger a file download in the browser */
export function downloadPdf(pdfBytes, filename = "result.pdf") {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Get the page count of a PDF */
export async function getPageCount(buffer) {
  const doc = await PDFDocument.load(buffer);
  return doc.getPageCount();
}

/** Merge multiple File objects into one PDF */
export async function mergePdfs(files) {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const buf  = await fileToBuffer(file);
    const doc  = await PDFDocument.load(buf);
    const idxs = doc.getPageIndices();
    const pages = await merged.copyPages(doc, idxs);
    pages.forEach((p) => merged.addPage(p));
  }
  return await merged.save();
}

/**
 * Extract specific pages from a PDF.
 * pageNumbers is a 1-based array, e.g. [1, 3, 5]
 */
export async function splitPdf(buffer, pageNumbers) {
  const src    = await PDFDocument.load(buffer);
  const output = await PDFDocument.create();
  // Convert to 0-based indices and filter valid ones
  const maxPage = src.getPageCount();
  const indices = pageNumbers
    .map((n) => n - 1)
    .filter((i) => i >= 0 && i < maxPage);
  if (indices.length === 0) throw new Error("No valid pages in range");
  const pages = await output.copyPages(src, indices);
  pages.forEach((p) => output.addPage(p));
  return await output.save();
}

/**
 * Parse a range string like "1-3, 5, 7-9" into a sorted unique array of page numbers.
 */
export function parsePageRange(rangeStr, maxPage) {
  const nums = new Set();
  const parts = rangeStr.split(",").map((s) => s.trim());
  for (const part of parts) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (isNaN(a) || isNaN(b) || a > b) throw new Error("Invalid range");
      for (let i = a; i <= b; i++) nums.add(i);
    } else {
      const n = Number(part);
      if (isNaN(n)) throw new Error("Invalid number");
      nums.add(n);
    }
  }
  return [...nums].filter((n) => n >= 1 && n <= maxPage).sort((a, b) => a - b);
}

/**
 * "Compress" a PDF by reserializing it.
 * pdf-lib can strip some metadata but cannot recompress images.
 * Returns new bytes (often slightly smaller).
 */
export async function compressPdf(buffer) {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  // Remove common metadata that adds unnecessary size
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");
  return await doc.save({ useObjectStreams: true });
}

/**
 * Rotate all pages by the given degrees (90, 180, 270).
 */
export async function rotatePdf(buffer, rotateDeg) {
  const doc = await PDFDocument.load(buffer);
  doc.getPages().forEach((page) => {
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + rotateDeg) % 360));
  });
  return await doc.save();
}

/**
 * Delete specific page numbers (1-based) from a PDF.
 */
export async function deletePages(buffer, pageNumbers) {
  const doc = await PDFDocument.load(buffer);
  // Sort descending so indices don't shift as we remove
  const sorted = [...pageNumbers].sort((a, b) => b - a);
  sorted.forEach((n) => doc.removePage(n - 1));
  return await doc.save();
}

/**
 * Remove password from a PDF.
 * Works for user-password protection. Owner-password removal is not guaranteed.
 */
export async function removePassword(buffer, password = "") {
  const doc = await PDFDocument.load(buffer, { password });
  return await doc.save();
}
