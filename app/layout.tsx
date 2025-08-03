import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DarkModeScript } from "./dark-mode-script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algebraic Factoring Calculator - Factor Polynomials Instantly | Free Math Tool",
  description: "Factor any algebraic expression instantly with our free online calculator. Perfect for students learning algebra, polynomial factorization, and quadratic equations. Includes step-by-step examples and educational content.",
  keywords: "factoring calculator, algebra calculator, polynomial factorization, quadratic equations, math help, factor polynomials, algebraic expressions, math tool, homework help",
  authors: [{ name: "Evan Calculator" }],
  creator: "Evan Calculator",
  publisher: "Evan Calculator",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '256x256', type: 'image/png' }
    ],
  },
  openGraph: {
    title: "Free Algebraic Factoring Calculator - Factor Any Polynomial",
    description: "Instantly factor algebraic expressions, polynomials, and quadratic equations. Perfect for students and educators. Try our free online math tool now!",
    url: "https://evan-calculator.vercel.app",
    siteName: "Evan Calculator",
    images: [
      {
        url: "/calculator-icon.svg",
        width: 512,
        height: 512,
        alt: "Algebraic Factoring Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Algebraic Factoring Calculator",
    description: "Factor polynomials and algebraic expressions instantly. Perfect for homework help!",
    images: ["/calculator-icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://evan-calculator.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Algebraic Factoring Calculator",
    "description": "Free online tool to factor algebraic expressions, polynomials, and quadratic equations instantly. Perfect for students and educators.",
    "url": "https://evan-calculator.vercel.app",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Celestial Platform, LLC",
      "url": "https://celestialplatform.com"
    },
    "educationalUse": ["assignment", "self-assessment", "practice"],
    "learningResourceType": "Calculator",
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "educationalSubject",
      "targetName": "Algebra"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <DarkModeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
