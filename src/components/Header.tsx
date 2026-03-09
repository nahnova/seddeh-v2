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
    <header>
      {/* ------------------------------------------------------------ */}
      {/*  Top bar — stately blue with logo & wapen                    */}
      {/* ------------------------------------------------------------ */}
      <div className="bg-primary-dark">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Startpagina"
          >
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
        {/* Thin gold rule — connects header to homepage gold accents */}
        <div className="h-px bg-gold/30" />
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  Navigation bar                                              */}
      {/* ------------------------------------------------------------ */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop navigation */}
            <nav
              className="hidden md:block"
              aria-label="Hoofdnavigatie"
            >
              <ul className="-mb-px flex">
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
                        className="group flex items-center gap-1 border-b-2 border-transparent px-3 py-3.5 font-serif text-sm text-text transition-colors hover:border-gold hover:text-primary-dark lg:px-4"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        onFocus={handleDropdownFocus}
                        onBlur={handleDropdownBlur}
                        onKeyDown={handleDropdownKeyDown}
                      >
                        {item.name}
                        <ChevronDown
                          size={13}
                          className={`text-text-light transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown */}
                      {dropdownOpen && (
                        <ul className="absolute left-0 top-full z-50 min-w-[240px] border border-border bg-white shadow-sm">
                          {/* Gold top accent */}
                          <div className="h-0.5 bg-gold" />
                          <li>
                            <Link
                              href={item.href}
                              className="block border-b border-border/50 px-5 py-2.5 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-cream"
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
                                className="block px-5 py-2.5 font-serif text-sm text-text transition-colors hover:bg-cream hover:text-primary-dark"
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
                        className="block border-b-2 border-transparent px-3 py-3.5 font-serif text-sm text-text transition-colors hover:border-gold hover:text-primary-dark lg:px-4"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/archief-aanvraag"
              className="hidden rounded-sm border-2 border-gold bg-gold px-5 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:border-gold-light hover:bg-gold-light md:block"
            >
              Archief Aanvragen
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 text-text md:hidden"
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  Mobile navigation                                           */}
      {/* ------------------------------------------------------------ */}
      {mobileOpen && (
        <nav
          className="border-b border-border bg-cream-dark md:hidden"
          aria-label="Hoofdnavigatie"
        >
          <ul className="divide-y divide-border/60">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-6 py-3.5 font-serif text-text transition-colors hover:text-primary-dark"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenuOpen((prev) => !prev)
                        }
                        className="px-5 py-3.5 text-text-light transition-colors hover:text-primary-dark"
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
                      <ul className="border-t border-border/40 bg-cream">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block border-l-2 border-gold/40 px-8 py-2.5 font-serif text-sm text-text-light transition-colors hover:border-gold hover:text-primary-dark"
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
                    className="block px-6 py-3.5 font-serif text-text transition-colors hover:text-primary-dark"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            {/* Mobile CTA */}
            <li>
              <Link
                href="/archief-aanvraag"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 font-serif text-sm font-semibold text-gold"
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
