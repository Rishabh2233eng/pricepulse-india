import type { Metadata, Viewport } from "next";
import { Epilogue, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PricePulse India — Real Market Prices",
  description: "Search any product and get real current Indian market prices powered by AI and ML.",
  keywords: "India price, mandi bhav, gold price, petrol price, vegetable price, market rate",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PricePulse",
  },
  openGraph: {
    title: "PricePulse India — Real Market Prices",
    description: "Search any product — vegetables, gold, petrol, phones, bikes, cars — get real Indian market prices.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A2F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PricePulse" />
      </head>
      <body className={`${epilogue.variable} ${outfit.variable} ${jetbrains.variable}`}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
      </body>
    </html>
  );
}