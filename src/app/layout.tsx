import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codejam.one"),
  title: {
    default: "Codejam 2026: Project Chronos | Immersive Hackathon",
    template: "%s | Codejam 2026",
  },
  description:
    "Join Codejam 2026: Project Chronos, the world's first truly immersive hackathon by SESC of SLIIT, combining DSA challenges and real-world engineering.",
  applicationName: "Codejam 2026",
  authors: [
    {
      name: "Software Engineering Student Community of SLIIT",
      url: "https://codejam.one",
    },
  ],
  creator: "Software Engineering Student Community of SLIIT",
  publisher: "Software Engineering Student Community of SLIIT",
  keywords: [
    "Codejam 2026",
    "Project Chronos",
    "immersive hackathon",
    "SLIIT hackathon",
    "SESC SLIIT",
    "software engineering competition",
    "DSA competition Sri Lanka",
    "undergraduate hackathon Sri Lanka",
  ],
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Codejam 2026",
    title: "Codejam 2026: Project Chronos",
    description:
      "The world's first truly immersive hackathon, organized by the Software Engineering Student Community of SLIIT.",
    locale: "en_LK",
    images: [
      {
        url: "/hero.png",
        width: 1672,
        height: 941,
        alt: "Codejam 2026: Project Chronos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codejam 2026: Project Chronos",
    description:
      "The world's first truly immersive hackathon by the Software Engineering Student Community of SLIIT.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Codejam 2026: Project Chronos",
  description:
    "The world's first truly immersive hackathon, combining data structures and algorithms with real-world software engineering challenges.",
  image: ["https://codejam.one/hero.png"],
  startDate: "2026-07-08T20:30:00+05:30",
  endDate: "2026-07-12T15:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "VirtualLocation",
      url: "https://platform.codejam.one",
    },
    {
      "@type": "Place",
      name: "Sri Lanka Institute of Information Technology",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Malabe",
        addressCountry: "LK",
      },
    },
  ],
  organizer: {
    "@type": "Organization",
    name: "Software Engineering Student Community of SLIIT",
    url: "https://codejam.one",
    email: "sesc.foc@sliit.lk",
  },
  url: "https://codejam.one",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}
