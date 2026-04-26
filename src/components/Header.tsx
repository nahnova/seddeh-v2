import { client } from "@/sanity/client";
import { navigationPagesQuery } from "@/sanity/lib/queries";
import { HeaderClient, type NavItem } from "./HeaderClient";

type SanityNavPage = {
  title: string;
  slug: { current: string };
  description?: string;
};

export async function Header() {
  const deStichtingPages: SanityNavPage[] = await client
    .fetch<SanityNavPage[]>(navigationPagesQuery)
    .catch(() => []);

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "De Stichting",
      href: "/de-stichting",
      children: deStichtingPages.map((page) => ({
        name: page.title,
        href: `/de-stichting/${page.slug.current}`,
      })),
    },
    { name: "Nieuws", href: "/nieuws" },
    { name: "Werkgroepen", href: "/werkgroepen" },
    { name: "Medewerkers", href: "/medewerkers" },
    { name: "Gallerijen", href: "/gallerijen" },
    { name: "Agenda", href: "/agenda" },
    { name: "Kennisbank", href: "/kennisbank" },
    { name: "Contact", href: "/contact" },
  ];

  return <HeaderClient navigation={navigation} />;
}
