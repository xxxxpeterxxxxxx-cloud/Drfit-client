import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://drift.gg", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://drift.gg/download", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://drift.gg/docs", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://drift.gg/changelog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];
}
