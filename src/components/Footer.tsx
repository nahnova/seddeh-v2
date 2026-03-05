import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-primary-dark">
              Stichting Eygelshoven
            </h3>
            <p className="font-serif text-sm leading-relaxed text-text-light">
              Heemkundevereniging voor Eygelshoven. Opgericht op 30 november
              1981 ter gelegenheid van het 850-jarig bestaan van Eygelshoven.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-primary-dark">
              Snelkoppelingen
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Kennisbank", href: "/kennisbank" },
                { name: "Archief Aanvragen", href: "/archief-aanvraag" },
                { name: "Gallerijen", href: "/gallerijen" },
                { name: "Contact", href: "/contact" },
                { name: "Schenking", href: "/contact/schenking" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-serif text-sm text-text-light transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-primary-dark">
              Contact
            </h3>
            <address className="font-serif text-sm not-italic leading-relaxed text-text-light">
              <p>Stichting Eygelshoven door de Eeuwen Heen</p>
              <p>Eygelshoven, Kerkrade</p>
              <p className="mt-2">
                <Link
                  href="/contact"
                  className="text-primary transition-colors hover:text-primary-dark"
                >
                  Neem contact op
                </Link>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="font-sans text-xs text-text-light">
            &copy; {new Date().getFullYear()} Stichting Eygelshoven door de
            Eeuwen Heen. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
