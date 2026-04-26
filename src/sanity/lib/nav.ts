import { client } from "@/sanity/client";
import { navigationPagesQuery } from "./queries";

export type DeStichtingNavItem = {
  slug: string;
  title: string;
  description?: string;
};

type SanityNavPage = {
  title: string;
  slug: { current: string };
  description?: string;
  order?: number;
};

// Always-present routes for "De Stichting", in their canonical display order.
// These map to live routes in src/app/de-stichting/[slug]/page.tsx — some are
// purely Sanity-driven, some have custom rendering (board, monuments, etc.).
// A Sanity `page` document with the same slug overrides title/description and
// can re-order via the `order` field.
const STATIC_BASELINE: Array<DeStichtingNavItem & { defaultOrder: number }> = [
  {
    slug: "wat-is-de-laethof",
    title: "Wat is De Laethof",
    description: "Informatie over ons onderkomen",
    defaultOrder: 1,
  },
  {
    slug: "het-bestuur",
    title: "Het Bestuur",
    description: "De bestuursleden van de stichting",
    defaultOrder: 2,
  },
  {
    slug: "de-doelstellingen",
    title: "De Doelstellingen",
    description: "Onze missie en doelen",
    defaultOrder: 3,
  },
  {
    slug: "publicaties",
    title: "Publicaties",
    description: "Uitgaven en publicaties",
    defaultOrder: 4,
  },
  {
    slug: "geschiedenis",
    title: "Geschiedenis",
    description: "Historische achtergrond",
    defaultOrder: 5,
  },
  {
    slug: "het-wapen-van-eygelshoven",
    title: "Het Wapen van Eygelshoven",
    description: "Het gemeentewapen",
    defaultOrder: 6,
  },
  {
    slug: "monumenten",
    title: "Monumenten",
    description: "Historische monumenten in Eygelshoven",
    defaultOrder: 7,
  },
  {
    slug: "boekenarchief",
    title: "Boekenarchief",
    description: "Catalogus van onze boekcollectie",
    defaultOrder: 8,
  },
];

export async function getDeStichtingNavItems(): Promise<DeStichtingNavItem[]> {
  const pages = await client
    .fetch<SanityNavPage[]>(navigationPagesQuery)
    .catch(() => []);

  type Entry = { item: DeStichtingNavItem; sortKey: number; tieBreaker: string };
  const bySlug = new Map<string, Entry>();

  for (const baseline of STATIC_BASELINE) {
    bySlug.set(baseline.slug, {
      item: {
        slug: baseline.slug,
        title: baseline.title,
        description: baseline.description,
      },
      sortKey: baseline.defaultOrder,
      tieBreaker: baseline.title,
    });
  }

  for (const page of pages) {
    const slug = page.slug.current;
    const existing = bySlug.get(slug);
    bySlug.set(slug, {
      item: {
        slug,
        title: page.title,
        description: page.description || existing?.item.description,
      },
      sortKey: page.order ?? existing?.sortKey ?? 9999,
      tieBreaker: page.title,
    });
  }

  return [...bySlug.values()]
    .sort(
      (a, b) =>
        a.sortKey - b.sortKey ||
        a.tieBreaker.localeCompare(b.tieBreaker, "nl"),
    )
    .map(({ item }) => item);
}
