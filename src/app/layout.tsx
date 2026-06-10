import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maaz Furniture Mart- Sofas, Beds, Tijori Online Shop",
  description:
    "Buy premium furniture online with fast delivery. Sofas, beds, wooden furniture, and iron safes available.",
  keywords:
    "furniture store India, sofa shop, bed store, tijori safe, wooden furniture online",
  openGraph: {
    title: "Maaz Furniture Mart - Sofas, Beds, Tijori Online Shop",
    description:
      "Buy premium furniture online with fast delivery. Sofas, beds, wooden furniture, and iron safes available.",
    type: "website",
    locale: "en_IN",
    siteName: "Maaz Furniture Mart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maaz Furniture Mart",
    description:
      "Buy premium furniture online with fast delivery.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-beige-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
