import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Gold top rule — matches header's gold bottom rule */}
      <div className="h-px bg-gold/30" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* About */}
          <div>
            <Image
              src="/logo.png"
              alt="Stichting Eygelshoven door de Eeuwen Heen"
              width={200}
              height={40}
              className="mb-4 h-10 w-auto"
            />
            <p className="font-serif text-sm leading-relaxed text-white/60">
              Heemkundevereniging voor Eygelshoven. Opgericht op 30 november
              1981 ter gelegenheid van het 850-jarig bestaan van Eygelshoven.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold">
              Snelkoppelingen
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px w-6 bg-gold/30" />
              <div className="h-1 w-1 rotate-45 bg-gold/40" />
            </div>
            <ul className="mt-4 space-y-2.5">
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
                    className="font-serif text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px w-6 bg-gold/30" />
              <div className="h-1 w-1 rotate-45 bg-gold/40" />
            </div>
            <address className="mt-4 font-serif text-sm not-italic leading-relaxed text-white/60">
              <p>Stichting Eygelshoven door de Eeuwen Heen</p>
              <p>Laethof, Putstraat 17</p>
              <p>6471 GB Eygelshoven</p>
              <p className="mt-3">
                <a
                  href="tel:045-2057088"
                  className="text-white/80 transition-colors hover:text-gold"
                >
                  045-2057088
                </a>
              </p>
              <p>
                <a
                  href="mailto:info.seddeh@gmail.com"
                  className="text-white/80 transition-colors hover:text-gold"
                >
                  info.seddeh@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="font-sans text-xs text-white/40">
            &copy; {new Date().getFullYear()} Stichting Eygelshoven door de
            Eeuwen Heen. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
