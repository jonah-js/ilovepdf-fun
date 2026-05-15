// lib/i18n.js
// All UI text in one place. Add more languages by adding a new key.

export const translations = {
  en: {
    // Header
    nav_all:       "All Tools",
    nav_organize:  "Organize",
    nav_convert:   "Convert",
    nav_security:  "Security",

    // Homepage
    hero_title:    "Every PDF tool\nyou'll ever need",
    hero_sub:      "Free, no sign-up, runs directly in your browser.\nYour files never leave your device.",
    trust_1:       "No account needed",
    trust_2:       "No server upload",
    trust_3:       "100% free",
    why_title:     "Why ilovepdf.fun?",
    why_body:      "Most online PDF services upload your files to their servers — a serious privacy risk. ilovepdf.fun processes everything directly in your browser using the open-source pdf-lib library. Your documents never leave your device at any point.",
    filter_all:    "All",
    filter_popular:"Popular",

    // Tools list
    tool_merge_title:    "Merge PDF",
    tool_merge_desc:     "Combine multiple PDFs into one document",
    tool_split_title:    "Split PDF",
    tool_split_desc:     "Extract pages or split into separate files",
    tool_compress_title: "Compress PDF",
    tool_compress_desc:  "Reduce file size without quality loss",
    tool_rotate_title:   "Rotate PDF",
    tool_rotate_desc:    "Rotate pages to the correct orientation",
    tool_delete_title:   "Delete Pages",
    tool_delete_desc:    "Remove individual pages from your PDF",
    tool_unlock_title:   "Remove Password",
    tool_unlock_desc:    "Unlock a password-protected PDF",

    // Shared tool UI
    upload_label:    "Drop your PDF here or click to select",
    upload_hint:     ".pdf files only",
    upload_multiple: "Drop your PDFs here or click to select",
    upload_hint_multi:"Multiple .pdf files supported",
    back:            "← All Tools",
    processing:      "Processing…",
    download_btn:    "Download",
    error_generic:   "Something went wrong. Please try again.",
    privacy_note:    "Your file is processed entirely in your browser and never uploaded to any server.",

    // Merge
    merge_title:     "Merge PDF",
    merge_desc:      "Combine multiple PDF files into a single document in any order.",
    merge_order:     "Drag to reorder:",
    merge_btn:       "Merge & Download",
    merge_min:       "Please select at least 2 PDF files.",
    merge_done:      "Done! Your merged PDF has been downloaded.",

    // Split
    split_title:     "Split PDF",
    split_desc:      "Enter the page range you want to extract from your PDF.",
    split_pages:     "pages found",
    split_range:     "Page range to extract (e.g. 1-3 or 2,4,6)",
    split_btn:       "Extract & Download",
    split_done:      "Done! Your extracted PDF has been downloaded.",
    split_err_range: "Invalid page range. Please check your input.",

    // Compress
    compress_title:  "Compress PDF",
    compress_desc:   "Reduce your PDF file size directly in the browser.",
    compress_btn:    "Compress & Download",
    compress_done:   "Done! Your compressed PDF has been downloaded.",
    compress_note:   "Browser-based compression removes redundant metadata. For heavy image compression, a server-side tool gives better results.",

    // Rotate
    rotate_title:    "Rotate PDF",
    rotate_desc:     "Rotate all pages of your PDF by 90°, 180° or 270°.",
    rotate_btn_90:   "Rotate 90° right",
    rotate_btn_180:  "Rotate 180°",
    rotate_btn_270:  "Rotate 90° left",
    rotate_done:     "Done! Your rotated PDF has been downloaded.",

    // Delete pages
    delete_title:    "Delete Pages",
    delete_desc:     "Select the pages you want to remove from your PDF.",
    delete_select:   "Click pages to mark for deletion:",
    delete_selected: "page(s) selected for deletion",
    delete_btn:      "Delete Pages & Download",
    delete_done:     "Done! The selected pages have been removed.",
    delete_min:      "Please select at least one page.",

    // Remove password
    unlock_title:    "Remove Password",
    unlock_desc:     "Enter the PDF password to remove its protection.",
    unlock_pw_label: "PDF password (leave blank if none)",
    unlock_btn:      "Unlock & Download",
    unlock_done:     "Done! The password has been removed.",
    unlock_err:      "Wrong password or the PDF could not be unlocked.",

    // Footer
    footer_rights:   "All rights reserved.",
    footer_privacy:  "Files are never uploaded to our servers.",
    imprint:         "Imprint",
    privacy:         "Privacy Policy",
  },

  de: {
    // Header
    nav_all:       "Alle Tools",
    nav_organize:  "Organisieren",
    nav_convert:   "Konvertieren",
    nav_security:  "Sicherheit",

    // Homepage
    hero_title:    "Jedes PDF-Tool,\ndas du brauchst",
    hero_sub:      "Kostenlos, keine Anmeldung, direkt im Browser.\nDeine Dateien verlassen nie dein Gerät.",
    trust_1:       "Kein Konto nötig",
    trust_2:       "Kein Server-Upload",
    trust_3:       "100% kostenlos",
    why_title:     "Warum ilovepdf.fun?",
    why_body:      "Die meisten PDF-Dienste laden deine Dateien auf ihre Server hoch – ein erhebliches Datenschutzrisiko. ilovepdf.fun verarbeitet alles direkt in deinem Browser mit der Open-Source-Bibliothek pdf-lib. Deine Dokumente verlassen dein Gerät zu keinem Zeitpunkt.",
    filter_all:    "Alle",
    filter_popular:"Beliebt",

    // Tools list
    tool_merge_title:    "PDFs zusammenfügen",
    tool_merge_desc:     "Mehrere PDFs zu einem Dokument zusammenfügen",
    tool_split_title:    "PDF aufteilen",
    tool_split_desc:     "Seiten extrahieren oder in einzelne Dateien aufteilen",
    tool_compress_title: "PDF komprimieren",
    tool_compress_desc:  "Dateigröße ohne Qualitätsverlust reduzieren",
    tool_rotate_title:   "PDF drehen",
    tool_rotate_desc:    "Seiten in die richtige Ausrichtung drehen",
    tool_delete_title:   "Seiten löschen",
    tool_delete_desc:    "Einzelne Seiten aus dem PDF entfernen",
    tool_unlock_title:   "Passwort entfernen",
    tool_unlock_desc:    "Passwortgeschütztes PDF entsperren",

    // Shared tool UI
    upload_label:    "PDF hier ablegen oder klicken",
    upload_hint:     "Nur .pdf Dateien",
    upload_multiple: "PDFs hier ablegen oder klicken",
    upload_hint_multi:"Mehrere .pdf Dateien möglich",
    back:            "← Alle Tools",
    processing:      "Wird verarbeitet…",
    download_btn:    "Herunterladen",
    error_generic:   "Fehler aufgetreten. Bitte erneut versuchen.",
    privacy_note:    "Deine Datei wird vollständig in deinem Browser verarbeitet und nie auf einen Server hochgeladen.",

    // Merge
    merge_title:     "PDFs zusammenfügen",
    merge_desc:      "Kombiniere mehrere PDF-Dateien zu einem einzigen Dokument.",
    merge_order:     "Reihenfolge:",
    merge_btn:       "Zusammenfügen & Herunterladen",
    merge_min:       "Bitte mindestens 2 PDF-Dateien auswählen.",
    merge_done:      "Fertig! Dein zusammengefügtes PDF wurde heruntergeladen.",

    // Split
    split_title:     "PDF aufteilen",
    split_desc:      "Gib den Seitenbereich ein, den du extrahieren möchtest.",
    split_pages:     "Seiten gefunden",
    split_range:     "Seitenbereich (z.B. 1-3 oder 2,4,6)",
    split_btn:       "Extrahieren & Herunterladen",
    split_done:      "Fertig! Dein extrahiertes PDF wurde heruntergeladen.",
    split_err_range: "Ungültiger Seitenbereich. Bitte Eingabe prüfen.",

    // Compress
    compress_title:  "PDF komprimieren",
    compress_desc:   "Reduziere die PDF-Dateigröße direkt im Browser.",
    compress_btn:    "Komprimieren & Herunterladen",
    compress_done:   "Fertig! Dein komprimiertes PDF wurde heruntergeladen.",
    compress_note:   "Browser-basierte Komprimierung entfernt redundante Metadaten. Für starke Bildkomprimierung empfehlen sich Server-seitige Tools.",

    // Rotate
    rotate_title:    "PDF drehen",
    rotate_desc:     "Drehe alle Seiten deines PDFs um 90°, 180° oder 270°.",
    rotate_btn_90:   "90° rechts drehen",
    rotate_btn_180:  "180° drehen",
    rotate_btn_270:  "90° links drehen",
    rotate_done:     "Fertig! Dein gedrehtes PDF wurde heruntergeladen.",

    // Delete pages
    delete_title:    "Seiten löschen",
    delete_desc:     "Wähle die Seiten aus, die du entfernen möchtest.",
    delete_select:   "Seiten anklicken zum Markieren:",
    delete_selected: "Seite(n) zum Löschen ausgewählt",
    delete_btn:      "Seiten löschen & Herunterladen",
    delete_done:     "Fertig! Die ausgewählten Seiten wurden entfernt.",
    delete_min:      "Bitte mindestens eine Seite auswählen.",

    // Remove password
    unlock_title:    "Passwort entfernen",
    unlock_desc:     "Gib das PDF-Passwort ein, um den Schutz aufzuheben.",
    unlock_pw_label: "PDF-Passwort (leer lassen falls keines)",
    unlock_btn:      "Entsperren & Herunterladen",
    unlock_done:     "Fertig! Das Passwort wurde entfernt.",
    unlock_err:      "Falsches Passwort oder PDF konnte nicht entsperrt werden.",

    // Footer
    footer_rights:   "Alle Rechte vorbehalten.",
    footer_privacy:  "Dateien werden nie auf unsere Server hochgeladen.",
    imprint:         "Impressum",
    privacy:         "Datenschutz",
  },
};

export const defaultLang = "en";
export const supportedLangs = ["en", "de"];
export const langNames = { en: "English", de: "Deutsch" };
