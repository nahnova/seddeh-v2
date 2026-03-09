import type { MetadataRoute } from "next";

const BASE_URL = "https://stichting-eygelshovendoordeeeuwenheen.nl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/studio/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
