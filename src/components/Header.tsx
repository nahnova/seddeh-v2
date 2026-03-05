"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "De Stichting",
    href: "/de-stichting",
    children: [
      { name: "Wat is De Laethof", href: "/de-stichting/wat-is-de-laethof" },
      { name: "Het Bestuur", href: "/de-stichting/het-bestuur" },
      { name: "De Doelstellingen", href: "/de-stichting/de-doelstellingen" },
      { name: "Publicaties", href: "/de-stichting/publicaties" },
      { name: "Geschiedenis", href: "/de-stichting/geschiedenis" },
      {
        name: "Het Wapen van Eygelshoven",
        href: "/de-stichting/het-wapen-van-eygelshoven",
      },
      { name: "Monumenten", href: "/de-stichting/monumenten" },
    ],
  },
  { name: "Nieuws", href: "/nieuws" },
  { name: "Werkgroepen", href: "/werkgroepen" },
  { name: "Gallerijen", href: "/gallerijen" },
  { name: "Agenda", href: "/agenda" },
  { name: "Kennisbank", href: "/kennisbank" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white">
      {/* Top bar with gold accent */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo area */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-primary-dark text-white">
              <span className="font-serif text-lg font-bold">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-semibold leading-tight text-primary-dark">
                Stichting Eygelshoven
              </h1>
              <p className="font-serif text-sm text-text-light">
                door de Eeuwen Heen
              </p>
            </div>
          </Link>

          {/* Desktop CTA */}
          <Link
            href="/archief-aanvraag"
            className="hidden rounded-md bg-primary px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-primary-dark md:block"
          >
            Archief Aanvragen
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-text md:hidden"
            aria-label="Menu openen"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden border-t border-border md:block">
          <ul className="flex gap-1">
            {navigation.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.children && setDropdownOpen(true)
                }
                onMouseLeave={() =>
                  item.children && setDropdownOpen(false)
                }
              >
                <Link
                  href={item.href}
                  className="block px-3 py-3 font-serif text-sm text-text transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>

                {item.children && dropdownOpen && (
                  <ul className="absolute left-0 top-full z-50 min-w-[220px] rounded-b-md border border-border bg-white shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 font-serif text-sm text-text transition-colors hover:bg-cream hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="border-t border-border bg-white md:hidden">
          <ul className="divide-y divide-border">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 font-serif text-text transition-colors hover:bg-cream"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <ul className="bg-cream-dark">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-10 py-2 font-serif text-sm text-text-light transition-colors hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/archief-aanvraag"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 font-sans text-sm font-medium text-primary"
              >
                Archief Aanvragen
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
