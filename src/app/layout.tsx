import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "L'artisan idéal",
    template: "%s | L'artisan idéal",
  },
  description:
    "Trouvez facilement des artisans qualifiés près de chez vous à Madagascar.",
  keywords: [
    "artisan Madagascar",
    "artisan Antananarivo",
    "plombier",
    "électricien",
    "menuisier",
    "maçon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white font-sans text-gray-900">
        {children}
      </body>
    </html>
  );
}
