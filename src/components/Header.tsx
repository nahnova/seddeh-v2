import { getDeStichtingNavItems } from "@/sanity/lib/nav";
import { HeaderClient, type NavItem } from "./HeaderClient";

export async function Header() {
  const deStichtingPages = await getDeStichtingNavItems();

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "De Stichting",
      href: "/de-stichting",
      children: deStichtingPages.map((page) => ({
        name: page.title,
        href: `/de-stichting/${page.slug}`,
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
