import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

export const revalidate = 120;

export async function GET() {
  const [pages, news, werkgroepen, galleries, monuments, events] =
    await Promise.all([
      client.fetch(groq`*[_type == "page" && defined(slug.current)]{
        "title": title,
        "slug": slug.current,
        "type": "page"
      }`),
      client.fetch(groq`*[_type == "news" && defined(slug.current)] | order(publishedAt desc){
        "title": title,
        "slug": slug.current,
        "type": "news"
      }`),
      client.fetch(groq`*[_type == "werkgroep" && defined(slug.current)]{
        "title": name,
        "slug": slug.current,
        "type": "werkgroep"
      }`),
      client.fetch(groq`*[_type == "gallery" && defined(slug.current)]{
        "title": title,
        "slug": slug.current,
        "type": "gallery"
      }`),
      client.fetch(groq`*[_type == "monument" && defined(slug.current)]{
        "title": name,
        "slug": slug.current,
        "type": "monument"
      }`),
      client.fetch(groq`*[_type == "event" && date >= now()] | order(date asc){
        "title": title,
        "type": "event"
      }`),
    ]);

  const staticPages = [
    { title: "Home", href: "/", type: "pagina" },
    { title: "De Stichting", href: "/de-stichting", type: "pagina" },
    { title: "Nieuws", href: "/nieuws", type: "pagina" },
    { title: "Werkgroepen", href: "/werkgroepen", type: "pagina" },
    { title: "Leden", href: "/leden", type: "pagina" },
    { title: "Lid Worden", href: "/lid-worden", type: "pagina" },
    { title: "Gallerijen", href: "/gallerijen", type: "pagina" },
    { title: "Agenda", href: "/agenda", type: "pagina" },
    { title: "Kennisbank", href: "/kennisbank", type: "pagina" },
    { title: "Contact", href: "/contact", type: "pagina" },
    { title: "Schenking", href: "/contact/schenking", type: "pagina" },
    { title: "Archief Aanvragen", href: "/archief-aanvraag", type: "pagina" },
  ];

  const hrefMap: Record<string, (slug: string) => string> = {
    page: (s) => `/de-stichting/${s}`,
    news: (s) => `/nieuws/${s}`,
    werkgroep: (s) => `/werkgroepen#${s}`,
    gallery: (s) => `/gallerijen/${s}`,
    monument: (s) => `/de-stichting/monumenten`,
    event: () => `/agenda`,
  };

  const typeLabels: Record<string, string> = {
    page: "pagina",
    news: "nieuws",
    werkgroep: "werkgroep",
    gallery: "galerij",
    monument: "monument",
    event: "agenda",
  };

  const dynamic = [
    ...pages,
    ...news,
    ...werkgroepen,
    ...galleries,
    ...monuments,
    ...events,
  ].map(
    (item: { title: string; slug?: string; type: string }) => ({
      title: item.title,
      href: hrefMap[item.type]?.(item.slug || "") || "/",
      type: typeLabels[item.type] || item.type,
    }),
  );

  return NextResponse.json([...staticPages, ...dynamic]);
}
