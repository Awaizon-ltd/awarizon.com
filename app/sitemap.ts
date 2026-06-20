import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awarizon.com";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/shift`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/infrastructure`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/adoption`, lastModified, changeFrequency: "monthly", priority: 0.8 },
{ url: `${baseUrl}/ecosystem`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/thesis`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/access`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
