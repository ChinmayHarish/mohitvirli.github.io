import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import "./globals.css";
import GalaxyContainer from './components/galaxy';

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  display: "swap",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  display: "swap",
  variable: "--font-vercetti",
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Chinmay Harish",
  description: "A product manager by profession, a builder at heart.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chinmay Harish",
    url: "https://chinmayharish.com",
    sameAs: [
      "https://github.com/ChinmayHarish",
      "https://www.linkedin.com/in/chinmay-harish-03106t"
    ],
    jobTitle: "Product Manager",
    worksFor: {
      "@type": "Organization",
      name: "Your Company"
    },
    description: "A product manager by profession, a builder at heart."
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="./ch.ico" sizes="any" />
        <link
          rel="preload"
          href="/fonts/Vercetti-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/soria-font.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`} suppressHydrationWarning>
        <GalaxyContainer />
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'} />
    </html>
  );
}
