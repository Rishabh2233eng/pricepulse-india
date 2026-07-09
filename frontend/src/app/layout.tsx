import type { Metadata } from "next";
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${outfit.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}