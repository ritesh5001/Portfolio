import "./globals.css";
import { SITE_URL, homeSeo, OG_IMAGE } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeSeo.title,
    template: "%s | Ritesh Giri",
  },
  description: homeSeo.description,
  authors: [{ name: "Ritesh Kumar Giri", url: SITE_URL }],
  creator: "Ritesh Kumar Giri",
  applicationName: "Ritesh Kumar Giri",
  alternates: { canonical: `${SITE_URL}/` },
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
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ritesh Kumar Giri",
    url: `${SITE_URL}/`,
    title: homeSeo.title,
    description: homeSeo.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/icons/professional-favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Only the two faces used above the fold are preloaded; the rest load
            on demand via @font-face in globals.css. */}
        <link
          rel="preload"
          href="/fonts/amiamie/woff2/Amiamie-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/amiamie/woff2/Amiamie-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
