import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Chinmay Harish",
  description: "A product manager by profession, a builder at heart.",
  keywords: "Chinmay Harish, Product Manager, Builder, Tinkerer, Tech Portfolio",
  authors: [{ name: "Chinmay Harish" }],
  creator: "Chinmay Harish",
  publisher: "Chinmay Harish",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Chinmay Harish - Product Manager",
    description: "A product manager by profession, a builder at heart.",
    url: "https://github.com/ChinmayHarish",
    siteName: "Chinmay Harish's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Harish - Product Manager",
    description: "A product manager by profession, a builder at heart.",
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Chinmay Harish",
      "jobTitle": "Product Manager",
    }
  };

  return (
    <html lang="en" className="overscroll-y-none" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'} />
    </html>
  );
}
