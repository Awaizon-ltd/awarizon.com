import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awarizon.com";
  const lastModified = new Date();

  return [
    // Core
    { url: baseUrl,                        lastModified, changeFrequency: "monthly", priority: 1    },
    // SDK — highest priority after home; this is the product
    { url: `${baseUrl}/sdk`,               lastModified, changeFrequency: "weekly",  priority: 0.97 },
    { url: `${baseUrl}/docs`,              lastModified, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${baseUrl}/access`,            lastModified, changeFrequency: "monthly", priority: 0.9  },
    // Company narrative
    { url: `${baseUrl}/shift`,             lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/infrastructure`,    lastModified, changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/adoption`,          lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/ecosystem`,         lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/thesis`,            lastModified, changeFrequency: "monthly", priority: 0.7  },
    // Learn
    { url: `${baseUrl}/learn`,             lastModified, changeFrequency: "weekly",  priority: 0.7  },
  ];
}
