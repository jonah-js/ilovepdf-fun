import { NextResponse } from "next/server";

// Map subdomains → internal paths
// To activate: add CNAME in DNS + add domain in Vercel dashboard
const SUBDOMAIN_MAP = {
  merge:           "/tools/merge",
  split:           "/tools/split",
  compress:        "/tools/compress",
  rotate:          "/tools/rotate",
  "delete-pages":  "/tools/delete-pages",
  unlock:          "/tools/remove-password",
};

export function middleware(request) {
  const hostname = request.headers.get("host") || "";

  // Extract subdomain — works on ilovepdf.fun and *.vercel.app
  const subdomain = hostname
    .replace(/\.ilovepdf\.fun$/, "")
    .replace(/\.vercel\.app$/, "")
    .split(".")[0];

  const targetPath = SUBDOMAIN_MAP[subdomain];
  if (targetPath && subdomain !== "www" && subdomain !== "ilovepdf") {
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\..*).*)"],
};
