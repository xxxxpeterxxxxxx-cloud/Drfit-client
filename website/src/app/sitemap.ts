import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://drift.gg", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://drift.gg/download", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://drift.gg/docs", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://drift.gg/docs/install", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://drift.gg/docs/config", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://drift.gg/docs/mods", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://drift.gg/docs/api", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://drift.gg/changelog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: "https://drift.gg/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: "https://drift.gg/community", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://drift.gg/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://drift.gg/tos", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://drift.gg/licenses", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
