"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const images = Array.from({ length: 16 }, (_, i) => `/hero/hero-${i + 1}.jpg`);

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const paused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => {
      setPrevious(prev);
      return (prev + 1) % images.length;
    });
  }, []);

  /* Auto-advance timer */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!paused.current) advance();
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  /* Clear "previous" after transition completes */
  useEffect(() => {
    if (previous === null) return;
    const t = setTimeout(() => setPrevious(null), 1200);
    return () => clearTimeout(t);
  }, [previous]);

  function goTo(index: number) {
    if (index === current) return;
    setPrevious(current);
    setCurrent(index);
  }

  return (
    <section
      className="relative overflow-hidden bg-primary-dark text-white"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* ── Image layers ────────────────────────────────── */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 2 : i === previous ? 1 : 0,
              transition: i === current ? "opacity 1.2s ease-in-out" : "none",
            }}
          >
            <Image
              src={src}
              alt="Sfeerbeeld van Eygelshoven"
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                animation:
                  i === current ? "hero-ken-burns 7s ease-out forwards" : "none",
              }}
              priority={i < 2}
            />
          </div>
        ))}
      </div>

      {/* ── Gradient overlays for text legibility ──────── */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-primary-dark/70 via-primary-dark/40 to-primary-dark/80" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(214,169,67,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Content overlay ────────────────────────────── */}
      <div className="relative z-20 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Image
            src="/wapen.png"
            alt="Wapen van Eygelshoven"
            width={80}
            height={96}
            className="mx-auto mb-8 h-20 w-auto drop-shadow-lg sm:h-24"
            priority
          />

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Eygelshoven
            <br />
            <span className="text-gold">door de Eeuwen Heen</span>
          </h1>

          {/* Decorative gold divider */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="block h-px w-8 bg-gold/40" />
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="block h-px w-8 bg-gold/40" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-white/80 sm:text-xl">
            Wij verzamelen, bewaren en ontsluiten de rijke historie van
            Eygelshoven. Opgericht in 1981 ter gelegenheid van het 850-jarig
            bestaan van ons dorp.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/de-stichting"
              className="rounded-sm border-2 border-gold bg-gold px-7 py-3 font-serif text-sm font-semibold tracking-wide text-primary-dark transition-colors hover:border-gold-light hover:bg-gold-light"
            >
              Ontdek onze geschiedenis
            </Link>
            <Link
              href="/archief-aanvraag"
              className="rounded-sm border-2 border-white/30 px-7 py-3 font-serif text-sm font-semibold tracking-wide text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Archief aanvragen
            </Link>
          </div>
        </div>

        {/* ── Dot indicators ─────────────────────────────── */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-6 bg-gold"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Ken Burns keyframes ──────────────────────────── */}
      <style jsx global>{`
        @keyframes hero-ken-burns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.06);
          }
        }
      `}</style>
    </section>
  );
}
