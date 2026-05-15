// app/sitemap.js
export default function sitemap() {
  const base  = "https://ilovepdf.fun";
  const tools = ["merge", "split", "compress", "rotate", "delete-pages", "remove-password"];

  return [
    { url: base,               lastModified: new Date(), priority: 1.0 },
    ...tools.map((slug) => ({
      url:          `${base}/tools/${slug}`,
      lastModified: new Date(),
      priority:     0.8,
    })),
    { url: `${base}/imprint`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.3 },
  ];
}
