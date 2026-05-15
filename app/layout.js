// app/layout.js
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default:  "ilovepdf.fun – Free PDF Tools Online",
    template: "%s | ilovepdf.fun",
  },
  description:
    "Free PDF tools that run directly in your browser. " +
    "Merge, split, compress, rotate, delete pages and remove passwords — " +
    "no sign-up, no server upload.",
  metadataBase: new URL("https://ilovepdf.fun"),
  openGraph: {
    siteName: "ilovepdf.fun",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          ── AdSense ──────────────────────────────────────────────
          Uncomment the script below once approved by Google AdSense.
          Replace XXXXXXXXXXXXXXXX with your Publisher ID.

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
          ─────────────────────────────────────────────────────────
        */}
      </head>
      <body>
        <Providers>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
