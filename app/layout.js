import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        {/*
          AdSense: uncomment once approved
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
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