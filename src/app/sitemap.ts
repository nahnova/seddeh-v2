import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

const BASE_URL = "https://stichting-eygelshovendoordeeeuwenheen.nl";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/de-stichting`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/nieuws`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/werkgroepen`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/gallerijen`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/agenda`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/kennisbank`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/contact/schenking`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${BASE_URL}/archief-aanvraag`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/leden`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/lid-worden`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  },
];

/** Fetch all slugs for a given Sanity document type. */
async function fetchSlugs(
  type: string,
): Promise<Array<{ slug: string; updatedAt: string }>> {
  return client.fetch(
    groq`*[_type == $type && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`,
    { type },
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [newsSlugs, gallerySlugs, pageSlugs] = await Promise.all([
    fetchSlugs("news"),
    fetchSlugs("gallery"),
    fetchSlugs("page"),
  ]);

  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((item) => ({
    url: `${BASE_URL}/nieuws/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((item) => ({
    url: `${BASE_URL}/gallerijen/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pageSlugs.map((item) => ({
    url: `${BASE_URL}/de-stichting/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...galleryRoutes, ...pageRoutes];
}
