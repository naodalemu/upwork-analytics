import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Upwork Income Analytics Dashboard",
  description:
    "Transform your Upwork transaction data into actionable insights. Upload your CSV file and discover comprehensive analytics about your income performance.",
  keywords: [
    "Upwork",
    "Income Dashboard",
    "CSV Upload",
    "Income Analytics",
    "Freelance Dashboard",
  ],
  authors: [
    {
      name: "Naod",
      url: "https://www.upwork.com/freelancers/~01cb9ac80cc3e1114e?mp_source=share",
    },
  ],
  openGraph: {
    title: "Upwork Income Analytics Dashboard",
    description:
      "Transform your Upwork transaction data into actionable insights. Upload your CSV file and discover comprehensive analytics about your income performance.",
    url: "https://upwork-analytics-alpha.vercel.app",
    siteName: "Upwork Income Analytics Dashboard",
    images: [
      {
        url: "https://upwork-analytics-alpha.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Upwork Income Analytics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upwork Income Analytics Dashboard",
    description:
      "Transform your Upwork transaction data into actionable insights. Upload your CSV file and discover comprehensive analytics about your income performance.",
    images: ["https://upwork-analytics-alpha.vercel.app/og-image.png"],
    creator: "@naod_alemu",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  verification: {
    google: "QPmwF9TJRbHcECKiI5OkukymkyYFOQORZyf16HhHNJg",
    yandex: "5feb494e75d6e013",
    other: {
      "google-site-verification": "QPmwF9TJRbHcECKiI5OkukymkyYFOQORZyf16HhHNJg",
      "yandex-verification": "5feb494e75d6e013",
    },
  },
  applicationName: "Upwork Income Analytics Dashboard",
  creator: "Naod",
  publisher: "Naod",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-EMZ5EGH8N2" />
      </body>

      {/* Lemon Squeezy script loaded once for the entire app */}
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
