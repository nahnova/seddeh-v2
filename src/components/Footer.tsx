import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <Image
              src="/logo.png"
              alt="Stichting Eygelshoven door de Eeuwen Heen"
              width={200}
              height={40}
              className="mb-4 h-10 w-auto"
            />
            <p className="font-serif text-sm leading-relaxed text-white/70">
              Heemkundevereniging voor Eygelshoven. Opgericht op 30 november
              1981 ter gelegenheid van het 850-jarig bestaan van Eygelshoven.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-gold">
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
                    className="font-serif text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-gold">
              Contact
            </h3>
            <address className="font-serif text-sm not-italic leading-relaxed text-white/70">
              <p>Stichting Eygelshoven door de Eeuwen Heen</p>
              <p>Laethof, Putstraat 17</p>
              <p>6471 GB Eygelshoven</p>
              <p className="mt-2">
                <a
                  href="tel:045-2057088"
                  className="text-white/90 transition-colors hover:text-gold"
                >
                  045-2057088
                </a>
              </p>
              <p>
                <a
                  href="mailto:info.seddeh@gmail.com"
                  className="text-white/90 transition-colors hover:text-gold"
                >
                  info.seddeh@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/20 pt-6 text-center">
          <p className="font-sans text-xs text-white/50">
            &copy; {new Date().getFullYear()} Stichting Eygelshoven door de
            Eeuwen Heen. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
