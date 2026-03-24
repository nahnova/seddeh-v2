import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Stichting Eygelshoven door de Eeuwen Heen";
const siteDescription =
  "Heemkundevereniging voor Eygelshoven. Wij verzamelen, bewaren en ontsluiten de rijke historie van ons dorp.";
const siteUrl = "https://stichting-eygelshovendoordeeeuwenheen.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "Eygelshoven",
    "heemkunde",
    "historie",
    "erfgoed",
    "Laethof",
    "Stichting Eygelshoven door de Eeuwen Heen",
    "Limburg",
    "mijnverleden",
    "mijngeschiedenis",
    "genealogie",
    "archief",
    "Kerkrade",
    "Parkstad",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/wapen.png",
    apple: "/wapen.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "nl_NL",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Stichting Eygelshoven door de Eeuwen Heen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${siteUrl}/#organization`,
    name: "Stichting Eygelshoven door de Eeuwen Heen",
    alternateName: "SEDDEH",
    url: siteUrl,
    logo: `${siteUrl}/wapen.png`,
    image: `${siteUrl}/opengraph-image.png`,
    description: siteDescription,
    email: "info.seddeh@gmail.com",
    telephone: "045-2057088",
    foundingDate: "1981-11-30",
    areaServed: {
      "@type": "Place",
      name: "Eygelshoven, Limburg, Nederland",
    },
    knowsAbout: [
      "Heemkunde",
      "Geschiedenis van Eygelshoven",
      "Genealogie",
      "Mijngeschiedenis Limburg",
      "Erfgoed Zuid-Limburg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Putstraat 17",
      postalCode: "6471 GB",
      addressLocality: "Eygelshoven",
      addressRegion: "Limburg",
      addressCountry: "NL",
    },
  };

  return (
    <html lang="nl">
      <body
        className={`${ebGaramond.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Direct naar inhoud
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
