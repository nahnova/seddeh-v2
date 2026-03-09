"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  }, []);

  const handleDropdownFocus = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setDropdownOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    },
    [],
  );

  return (
    <header className="border-b border-border">
      {/* Top bar with logo on blue background */}
      <div className="bg-primary-dark">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Startpagina">
            <Image
              src="/logo.png"
              alt="Stichting Eygelshoven door de Eeuwen Heen"
              width={240}
              height={48}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>
          <Image
            src="/wapen.png"
            alt="Wapen van Eygelshoven"
            width={40}
            height={48}
            className="hidden h-12 w-auto sm:block"
          />
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
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
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden border-t border-border md:block" aria-label="Hoofdnavigatie">
          <ul className="flex gap-1">
            {navigation.map((item) =>
              item.children ? (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-3 font-serif text-sm text-text transition-colors hover:text-primary"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    onFocus={handleDropdownFocus}
                    onBlur={handleDropdownBlur}
                    onKeyDown={handleDropdownKeyDown}
                  >
                    {item.name}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute left-0 top-full z-50 min-w-[220px] rounded-b-md border border-border bg-white shadow-lg">
                      <li>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 font-serif text-sm font-medium text-text transition-colors hover:bg-cream hover:text-primary"
                          onFocus={handleDropdownFocus}
                          onBlur={handleDropdownBlur}
                        >
                          Overzicht
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 font-serif text-sm text-text transition-colors hover:bg-cream hover:text-primary"
                            onFocus={handleDropdownFocus}
                            onBlur={handleDropdownBlur}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-3 font-serif text-sm text-text transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="border-t border-border bg-white md:hidden" aria-label="Hoofdnavigatie">
          <ul className="divide-y divide-border">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-6 py-3 font-serif text-text transition-colors hover:bg-cream"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSubmenuOpen((prev) => !prev)}
                        className="px-4 py-3 text-text transition-colors hover:text-primary"
                        aria-expanded={mobileSubmenuOpen}
                        aria-label={`${item.name} submenu ${mobileSubmenuOpen ? "sluiten" : "openen"}`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileSubmenuOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {mobileSubmenuOpen && (
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
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 font-serif text-text transition-colors hover:bg-cream"
                  >
                    {item.name}
                  </Link>
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
